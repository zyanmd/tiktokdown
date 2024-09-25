const tiktokDL = async (url) => {
    let domain = 'https://www.tikwm.com/';
    let res = await axios.post(domain + 'api/', {}, {
        headers: {
            'accept': 'application/json, text/javascript, */*; q=0.01',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
        },
        params: {
            url: url,
            count: 12,
            cursor: 0,
            web: 1,
            hd: 1,
        }
    });

    return {
        nowm: domain + res.data.data.play,
        wm: domain + res.data.data.wmplay,
        music: domain + res.data.data.music,
    };
};

const downloadFile = (url, filename) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

const displayVideo = (url) => {
    const videoDisplay = document.getElementById('videoDisplay');
    const videoSource = document.getElementById('videoSource');
    const videoPlayer = document.getElementById('videoPlayer');

    videoSource.src = url;
    videoPlayer.load();
    videoDisplay.style.display = 'block';
};

const showDownloadButtons = () => {
    const buttons = document.querySelectorAll('#buttonContainer button');
    buttons.forEach(button => button.classList.add('show')); // Show buttons when a link is processed
};

document.getElementById('downloadVideo').addEventListener('click', async () => {
    const url = document.getElementById('urlInput').value;
    if (url) {
        const { nowm } = await tiktokDL(url);
        displayVideo(nowm);
        showDownloadButtons();
    } else {
        alert('Please enter a valid URL');
    }
});

document.getElementById('downloadVideoWM').addEventListener('click', async () => {
    const url = document.getElementById('urlInput').value;
    if (url) {
        const { wm } = await tiktokDL(url);
        displayVideo(wm);
        showDownloadButtons();
    } else {
        alert('Please enter a valid URL');
    }
});

document.getElementById('downloadAudio').addEventListener('click', async () => {
    const url = document.getElementById('urlInput').value;
    if (url) {
        const { music } = await tiktokDL(url);
        downloadFile(music, 'tiktok_audio.mp3');
        showDownloadButtons();
    } else {
        alert('Please enter a valid URL');
    }
});
