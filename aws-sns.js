
// Import the required AWS SDK client
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

// Initialize the SNS Client with your region
const snsClient = new SNSClient({ region: 'ap-south-1' }); // Use your preferred region

// Create a function to send a message
async function sendMessage() {
  const params = {
    Message: 'Hello from Node.js SNS!',
    TopicArn: 'arn:aws:sns:ap-south-1:140023406191:My_SNS_321', 
  };

  try {
    const data = await snsClient.send(new PublishCommand(params));
    console.log("Message sent successfully:", data);
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

// Call the sendMessage function
sendMessage();