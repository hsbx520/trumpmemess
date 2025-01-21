const roundTime = 1729072800;

const getIsExtraEnd = () => {
    return Math.floor(Date.now() / 1000) > roundTime;
};

const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number;
};

const getCountdown = () => {
    const currentTime = Math.floor(Date.now() / 1000);
    const targetTime = roundTime;
    let timeDifference = targetTime - currentTime;
    if (timeDifference <= 0) {
        return ["00", "00", "00", "00"];
    }
    const days = Math.floor(timeDifference / (24 * 60 * 60));
    const hours = Math.floor((timeDifference % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeDifference % (60 * 60)) / 60);
    const seconds = timeDifference % 60;
    return [formatNumber(days), formatNumber(hours), formatNumber(minutes), formatNumber(seconds)];
};

const updateLeaderboard = async () => {
    const account=localStorage.getItem('walletAddr')
    try {
        const response = await fetch(`https://server.trumpmeme.net/api/game/rank?address=${account}`); 
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        // document.getElementById('leaderboard').innerText = JSON.stringify(data, null, 2);
        if(data?.msg?.info?.score){
            document.getElementById('claimable_num').innerText =data.msg.info.score.toLocaleString();
        }
    } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
        // document.getElementById('leaderboard').innerText = 'Error loading leaderboard';
    }
};

const updateCountdown = () => {
    const isExtraEnd = getIsExtraEnd();
    const countdown = getCountdown();
    document.getElementById('countdown').innerText = countdown.join(':');
    // console.log(JSON.parse(localStorage.getItem('user.user')).score)
    // document.getElementById('claimable_num').innerText = JSON.parse(localStorage.getItem('user.user')).score;
    // if (isExtraEnd) {
    //     // Add any logic you want to execute once the countdown ends
    // }
};

const updateLeader = () => {
    updateLeaderboard()
};

updateLeaderboard()
// updateCountdown();
setInterval(updateLeader, 10000);
