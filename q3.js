// Define colors
const colors = ['purple', 'gold'];
let colorIndex = 0;

// Function to apply colors to words
function colorWords(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const words = node.nodeValue.split(/\s+/);

    // Process each word in the text node
    let newNode = document.createElement('span');
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const span = document.createElement('span');
      span.style.color = colors[colorIndex];
      span.textContent = word + ' ';
      colorIndex = (colorIndex + 1) % colors.length;
      newNode.appendChild(span);
    }

    // Replace the text node with the colored words
    node.replaceWith(newNode);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // Process child nodes of the current element
    for (const childNode of node.childNodes) {
      colorWords(childNode);
    }
  }
}

// Call the function to apply colors to the entire document body
colorWords(document.body);
