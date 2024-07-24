async function evaluateMessage(message, personality, affectionScore) {
    const apiKey = 'app-pr3GqTgsBf6MW7Z93akXKUw0';  // Dify APIキーに置き換えてください
    const apiUrl = 'https://api.dify.ai/v1/workflows/run';
    const errorMessage = {
        評価: 0,
        反応: '＜エラー＞APIリクエストに失敗したみたい。sendGpt.js内のAPIキーの設定を確認してみてね。',
        心の声: '早くお兄ちゃんと話したいなあ。'
    };

    // affectionScoreを整数に変換
    const data = {
        "inputs": {
            "message": message,
            "personality": personality,
            "affectionScore": affectionScore + 1, // 0だとAPIエラーになるので+1する
        },
        "response_mode": "blocking",
        "user": "abc-123"
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Error:', error);
            return errorMessage;
        }

        const resultData = await response.json();
        console.log(resultData);
        const result = resultData.data.outputs.result.replace("```json", "").replace("```", "").trim();
        return JSON.parse(result);

    } catch (error) {
        console.error('Error:', error);
        return errorMessage;
    }
}