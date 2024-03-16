const chatForm = get('form');
const chatInput = get('input');
const chatBox = get('main');
let botresp
appendMessage('bot', 'Hello, I am MediBot. I am here to assist you in finding help for your medical problems. What symptoms are you experiencing?');
let memory = 'context : You are a medical assistant chatbot and your role is to help diagnose the user or pass them on to a doctor.\nHere is a message history of your conversation :\nYou Said : Hello, I am MediBot. I am here to assist you in finding help for your medical problems. What symptoms are you experiencing?\n'
chatForm.addEventListener('submit', event => {
  event.preventDefault();
  const text = chatInput.value;
  if (!text) return;
  
  appendMessage('user', text);
  chatInput.value = '';


  query({
    "inputs": memory + 'Here Is the user\'s next message you have to respond to : ' + text + '.\nYour response to the user : ',
    "parameters": {
      "top_k": 1
    }
  }).then((response) => {
    console.log(response)
    console.log(response[0].generated_text)
    botresp = response[0].generated_text
    appendMessage('bot', botresp)
    memory += 'The user said : '+text + '.\nYou responded : ' + botresp + '.\n'
    console.log(memory);
  });
  
  
});

function appendMessage(side, text) {
  const bubble = `
    <div class="msg -${side}">
        <div class="bubble">${text}</div>
    </div>`;
  chatBox.insertAdjacentHTML('beforeend', bubble);
  chatBox.scrollTop += 500;
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

async function query(data) {
	const response = await fetch(
		"https://xevhza5rhd1jhkq8.us-east-1.aws.endpoints.huggingface.cloud",
		{
			headers: { 
				"Accept" : "application/json",
				"Content-Type": "application/json" 
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

// query({
//     "inputs": "This is the text sent to the model",
//     "parameters": {}
// }).then((response) => {
// 	console.log(JSON.stringify(response));
// });