import React, { useState } from 'react';

function App() {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const handleTranslate = async () => {
        const response = await fetch('http://localhost:8000/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: inputText })
        });

        const data = await response.json();
        setTranslatedText(data.message);
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem'}}>
            <h2>번역기</h2>
            <textarea
            value = {inputText}
            onChange = {(e) => setInputText(e.target.value)}
            rows={5}
            style={{ width: '100%', fontSize: '1rem'}}
            placeholder="번역할 문장을 입력하세요"
        />
        <br /><br />
        <button onClick={handleTranslate}>번역하기</button>
        <div style = {{ marginTop: '2rem', background: '#f0f0f0', padding: '1rem'}}>
            <strong>번역 결과:</strong>
            <p>{translatedText}</p>
            </div>
        </div>
    );   
}

export default App;