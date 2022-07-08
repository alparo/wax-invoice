const wax = new waxjs.WaxJS({
    rpcEndpoint: 'https://wax.greymass.com'
});

//automatically check for credentials
autoLogin();

const params = new Proxy(new URLSearchParams(window.location.search), {
get: (searchParams, prop) => searchParams.get(prop),
});
//http://localhost:63342/wax-invoice/?to=thisismyfirs&amount=0.00000010&memo=feed

const amount = Number(params.amount).toFixed(8) + ' WAX';
document.getElementById('to').innerHTML = params.to;
document.getElementById('amount').innerHTML = amount;
document.getElementById('memo').innerHTML = params.memo;

//checks if autologin is available
async function autoLogin() {
    let isAutoLoginAvailable = await wax.isAutoLoginAvailable();
    if (isAutoLoginAvailable) {
        let userAccount = wax.userAccount;
        let pubKeys = wax.pubKeys;
        let str = 'AutoLogin enabled for account: ' + userAccount
        document.getElementById('autologin').insertAdjacentHTML('beforeend', str);
    }
    else {
        document.getElementById('autologin').insertAdjacentHTML('beforeend', 'Not auto-logged in');
    }
}

//normal login. Triggers a popup for non-whitelisted dapps
async function login() {
    try {
        //if autologged in, this simply returns the userAccount w/no popup
        let userAccount = await wax.login();
        let pubKeys = wax.pubKeys;
        let str = 'Logged in as: ' + userAccount
        document.getElementById('loginresponse').insertAdjacentHTML('beforeend', str);
    } catch (e) {
        document.getElementById('loginresponse').append(e.message);
    }
}

async function sign() {
if(!wax.api) {
    return document.getElementById('response').append('* Login first *');
}

try {
    const result = await wax.api.transact({
    actions: [{
        account: 'eosio.token',
        name: 'transfer',
        authorization: [{
            actor: wax.userAccount,
            permission: 'active',
        }],
        data: {
          from: wax.userAccount,
          to: params.to,
          quantity: amount,
          memo: params.memo,
        },
    }]
    }, {
    blocksBehind: 3,
    expireSeconds: 30
    });
    document.getElementById('response').append('Payment successful!')
} catch(e) {
    document.getElementById('response').append(e.message);
}
}