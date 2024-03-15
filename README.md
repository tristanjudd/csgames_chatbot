CS Games chatbot challenge

let botresp
appendMessage('bot', 'Hello, I am MediBot. I am here to assist you in finding help for your medical problems. What symptoms are you experiencing?');
memory = 'context: you are a medical assistant and are in charge of sorting the current patient, you will ask them to describe their symptoms and decide if they require further medical care or not, you must be proactive and prompting the user in order to diagnose them properly, and keep questioning them until you can make a propper diagnosis, but do NOT overwhelm the user, do not ask too many questions in the same response. The following message history shows your past interaction with the user : You said : Welcome to mediBot. I will be pleased to assist you in your diagnosis. Please tell me of your symptoms, why are you here ? I will then assist you in the diagnosis .'
chatForm.addEventListener('submit', event => {
  event.preventDefault();
  const text = chatInput.value;
  if (!text) return;
  
  appendMessage('user', text);
  chatInput.value = '';

  const prompt = text

  query({
    "inputs": memory + 'Here Is the user\'s message you have to respond to : ' + prompt + 'your response to the user : ',
    "parameters": {
      "top_k": 1
    }
  }).then((response) => {
    console.log(response)
    console.log(response[0].generated_text)
    botresp = response[0].generated_text
    appendMessage('bot', botresp)
  });
  memory += 'The user said : '+text + '. You responded ' + botresp 

  
});
