import {
	DeleteObjectCommand,
	GetObjectCommand,
	GetObjectCommandInput,
	S3Client,
} from "@aws-sdk/client-s3";
import { S3Event } from "aws-lambda";
import { Readable } from "node:stream";
import unzipper from "unzipper";
import mime from "mime-types";
import { Upload } from "@aws-sdk/lib-storage";

const client = new S3Client({
	region: process.env.AWS_REGION ?? "us-east-1",
});

const AWS_BUCKET_FINAL_NAME =
    process.env.AWS_BUCKET_FINAL_NAME ?? "" ;

export const handler = async (event: S3Event): Promise<void> => {
	console.log("Received event:", JSON.stringify(event, null, 2));
	console.log("Processing file:", event.Records[0].s3.object.key);

	const bucket = event.Records[0].s3.bucket.name;
	const key = decodeURIComponent(
		event.Records[0].s3.object.key.replace(/\+/g, " ")
	);
	const zipPrefix = key.replace(/\.zip$/, "");

	try {
		// Get the zip file from S3
		const input: GetObjectCommandInput = { Bucket: bucket, Key: key };
		const command = new GetObjectCommand(input);
		const response = await client.send(command);
		const webStream = response.Body?.transformToWebStream();

		if (!webStream) throw new Error("No WebStream found for zip");

		// Convert web stream to node stream
		const nodeStream = Readable.from(webStream);

		// Wrap stream processing in a promise to ensure Lambda waits for completion
		return new Promise((resolve, reject) => {
			const uploadPromises: Promise<any>[] = [];

			nodeStream
				.pipe(unzipper.Parse())
				.on("entry", (entry: unzipper.Entry) => {
					const fileName = entry.path;
					const type = entry.type;

					if (type === "File") {
						console.log(`Processing file: ${fileName}`);

						const targetKey = `${zipPrefix}/${fileName}`;
						const contentType =
							mime.lookup(fileName) || "application/octet-stream";

						// Push upload promise to array for tracking
						const uploadPromise = (async () => {
							try {
								// Log before uploading
								console.log(`Preparing to upload: ${fileName} to ${targetKey}`);

								// Stream the file to S3 using multipart upload
								const upload = new Upload({
									client,
									params: {
										Bucket: AWS_BUCKET_FINAL_NAME, 
										Key: targetKey,
										Body: entry, // Stream the file directly to S3
										ContentType: contentType,
									},
								});

								// Log upload initiation
								console.log(`Uploading to S3: ${targetKey}`);

								await upload.done();

								// Log success once upload completes
								console.log(`✅ Uploaded: ${targetKey}`);
							} catch (err) {
								// Log errors if the upload fails
								console.error(`❌ Failed to upload ${fileName}:`, err);
							}
						})();

						uploadPromises.push(uploadPromise);
					} else {
						// Skip non-file entries by draining them
						entry.autodrain();
					}
				})
				.on("close", async () => {
					try {
						console.log("Unzip completed. Waiting for uploads to finish...");

						// Wait for all uploads to complete
						await Promise.allSettled(uploadPromises);

						// Delete the original zip file after processing all files
						try {
							const deleteCommand = new DeleteObjectCommand({
								Bucket: bucket,
								Key: key,
							});
							const deleteResponse = await client.send(deleteCommand);
							console.log("🧹 Deleted original zip:", deleteResponse);
						} catch (err) {
							console.error("❌ Failed to delete original zip:", err);
						}

						// Resolve the promise to signal Lambda completion
						resolve();
					} catch (err) {
						console.error("❌ Error in close handler:", err);
						reject(err);
					}
				})
				.on("error", (err: Error) => {
					// This should log any errors in unzipping
					console.error("❌ Stream unzip error:", err);
					reject(err);
				});
		});
	} catch (err) {
		console.error("❌ Handler error:", err);
		throw err; // Re-throw to signal Lambda failure
	}
};
