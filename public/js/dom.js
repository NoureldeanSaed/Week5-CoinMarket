const fetch = (method, url, value, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let response = JSON.parse(xhr.responseText)
      cb(response)

    }
  };
  xhr.open(method, url)
  xhr.send(value)
}


const selector=(text)=>{
  return document.querySelector(text)
}

const create = (parent, element, content, classes,value) => {

  let child = document.createElement(element)
  child.setAttribute("class", classes)
if (value) {
  child.value=value;

}

  if (content) {
    child.textContent = content;
  }
  if (parent) {
    return selector(parent).appendChild(child)
  } else {
    return child
  }
}

const createTable = (response) => {
  response.forEach((element) => {
    let rowDiv = create("#resultTable", "div", null)
    let array = [
      element.name, element.rank, element.price_usd,
      element.percent_change_1h, (element.last_updated)
    ]

    array.forEach((content) => {
      rowDiv.appendChild(create(null, "div", content, null))
    })

  })

}



if(selector('#sourceCoin')){
  let convertedValue = 1;

function getData(){

  let sourceCoin=selector("#sourceCoin").value
  let outCoin =selector("#outCoin").value
  let values = sourceCoin +'.'+ outCoin ;
  fetch("POST","/c",values,(res)=>{

    convertedValue=Object.values(res)[0]

    let calculatedValue = calculate(inputValue.value ,  convertedValue)
    outputValue.value=calculatedValue

})
}


  selector('#sourceCoin').addEventListener("click",(event)=>{
      event.preventDefault();
      getData();
  })



  selector('#outCoin').addEventListener("click",(event)=>{
      event.preventDefault();
      getData();
  })


    let inputValue = selector("#inputConvert");
    let outputValue = selector('#outputConvert')
  inputValue.addEventListener("keyup",(event)=>{
    let calculatedValue = calculate(inputValue.value ,  convertedValue)
    outputValue.value=calculatedValue

  })

  }

const createDetails = (res, id) => {

  let array = [res.symbol, res.price_usd, res.rank]
  create("#" + id, "figcaption", "Symbol : " + res.symbol, "details")
  create("#" + id, "figcaption", "Price $: " + res.price_usd, "details")
  create("#" + id, "figcaption", "Rank : " + res.rank, "details")

}

const creatList=(nameArr,symbolArr)=>{
  for (var i = 0; i < nameArr.length; i++) {
    create("#sourceCoin", "option", nameArr[i], "options",symbolArr[i])
    create("#outCoin", "option", nameArr[i], "options",symbolArr[i])
  }

}

if (selector("#searchButton")) {
  selector("#searchButton").addEventListener('click', (event) => {
    event.preventDefault();

    let inputValue = selector("#inputId")
    if(inputValue.value.trim() !== ''){
    fetch("POST","/search",inputValue.value,(res)=>{

      createTable(res.slice(0,1))

    })
  }else{
    alert('enter some data')
  }
  })
}


if (selector("#formID")) {
  const coinName = ["Bitcoin", "Ethereum", "Ripple", "Bitcoin Cash", "Litecoin", "EOS", "Cardano",
    "Stellar", "NEO", "IOTA", "Monero", "TRON", "Dash", "Tether", "NEM", "VeChain",
    "Ethereum Classic", "Binance Coin", "Verge", "Qtum", "Ontology", "OmiseGO", "Lisk",
    "ICON", "Bitcoin Gold", "Zcash", "Nano", "Bytom", "Steem", "Wanchain", "Bytecoin",
    "Populous", "DigixDAO", "Siacoin", "Stratis", "BitShares", "Waves", "Bitcoin Diamond",
    "RChain", "Dogecoin", "Decred", "Maker", "Aeternity", "Status", "0x", "Zilliqa", "Komodo",
    "Augur", "Ardor", "IOStoken", "Aion", "Loopring", "Waltonchain", "KuCoin Shares", "Ark",
    "Hshare", "Golem", "PIVX", "DigiByte", "Cryptonex", "Centrality",
    "Basic Attention Token", "aelf", "MonaCoin", "QASH", "Veritaseum", "Factom",
    "Dragonchain", "Elastos", "Nebulas", "Gas", "Substratum", "GXChain", "Ethos",
    "Syscoin", "ReddCoin", "Mixin", "Kyber Network", "Revain", "FunFair", "Electroneum",
    "SALT", "Skycoin", "ZCoin", "Byteball Bytes", "Nucleus Vision", "ChainLink", "Nxt",
    "MaidSafeCoin", "Storm", "Power Ledger", "Bancor", "Enigma", "Particl", "WAX",
    "Request Network", "Neblio", "Dent", "TenX", "Storj"
  ]
  const coinSymbol = ["BTC", "ETH", "XRP", "BCH", "LTC", "EOS", "ADA", "XLM", "NEO", "MIOTA",
    "XMR", "TRX", "DASH", "USDT", "XEM", "VEN", "ETC", "BNB", "XVG", "QTUM", "ONT", "OMG", "LSK",
    "ICX", "BTG", "ZEC", "NANO", "BTM", "STEEM", "WAN", "BCN", "PPT", "DGD", "SC", "STRAT",
    "BTS", "WAVES", "BCD", "RHOC", "DOGE", "DCR", "MKR", "AE", "SNT", "ZRX", "ZIL", "KMD",
    "REP", "ARDR", "IOST", "AION", "LRC", "WTC", "KCS", "ARK", "HSR", "GNT", "PIVX", "DGB",
    "CNX", "CENNZ", "BAT", "ELF", "MONA", "QASH", "VERI", "FCT", "DRGN", "ELA", "NAS", "GAS",
    "SUB", "GXS", "ETHOS", "SYS", "RDD", "XIN", "KNC", "R", "FUN", "ETN", "SALT", "SKY",
    "XZC", "GBYTE", "NCASH", "LINK", "NXT", "MAID", "STORM", "POWR", "BNT", "ENG",
    "PART", "WAX", "REQ", "NEBL", "DENT", "PAY", "STORJ"
  ]
   creatList(coinName,coinSymbol)

}

const deletefig = () => {
  const array = document.getElementsByClassName('details')
  let array2 = Array.prototype.slice.call(array)
  array2.forEach((item) => {
    item.innerHTML = ""
  })
}


const array = document.getElementsByClassName('fig')
let array2 = Array.prototype.slice.call(array)
array2.forEach((fig) => {
  fig.addEventListener("click", (event) => {

    deletefig()
    let symbol = fig.id

    fetch("POST", "/search", symbol, (res) => {

      createDetails(res[0], fig.id);

    })
  })

})
