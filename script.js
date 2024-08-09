document.getElementById('convertButton').addEventListener('click', async () => {
    const text = document.getElementById('textInput').value;
    try {
        const response = await fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });

        const data = await response.json();
        if (data.success) {
            console.log('Speech generated successfully:', data.result);

            // Update the audio source with the latest generated file
            const audioSource = document.getElementById('audioSource');
            const timestamp = new Date().getTime();
            audioSource.src = `output_voice.mp3?t=${timestamp}`;
            
            // Reload the audio element to apply the new source
            const audioPlayer = document.getElementById('audioPlayer');
            audioPlayer.load();
        } else {
            console.error('Error:', data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
