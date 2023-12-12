import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const ChatBot = () => {
  const [response, setResponse] = useState('');

  const fetchAIResponse = async () => {
    const apiKey = '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';
    const prompt = 'Once upon a time';

    try {
      const result = await axios.post(
        'https://api.openai.com/v1/engines/davinci/completions', // Updated endpoint
        {
          prompt: prompt,
          max_tokens: 50,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      setResponse(result.data.choices[0].text);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  return (
    <View>
      <Button title="Generate AI Text" onPress={fetchAIResponse} />
      <Text>{response}</Text>
    </View>
  );
};

export default ChatBot;
