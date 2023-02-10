/* eslint-disable no-undef */

import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
// import fs from 'fs';

function NewComp() {
  const [textData, setTextData] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the data here
    const processedData = processData(textData);
    // Write the data to a file
    fs.writeFileSync('../data/data.txt', processedData);
    // Update the message state
    setMessage('Data processed and saved successfully!');
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormControl
          type="text"
          placeholder="Enter some text data"
          value={textData}
          onChange={(event) => setTextData(event.target.value)}
        />
        <Button type="submit">Submit</Button>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
}

function processData(text) {
  // Do something with the text data here
  return text.toUpperCase();
}

export default NewComp;
