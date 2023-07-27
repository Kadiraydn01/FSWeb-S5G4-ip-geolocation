//axios import buraya gelecek
import axios from "axios";
var benimIP;

// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
  await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  })
    .then(function (response) {
      return response.data;
    })
    .then(function (a) {
      benimIP = a;
    });
}
// ------------ değiştirmeyin --------------

/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	NOT: API'den gelen bayrak url'i çalışmazsa alternatif olarak: https://flagsapi.com/
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/

//kodlar buraya gelecek
//1.
async function ipAdresimiAl2() {
  await axios({
    method: "get",
    url: "https://apis.ergineer.com/176.88.148.57",
  })
    .then(function (response) {
      return response.data;
    })
    .then(function (a) {
      benimIP = a;
    });
}

//3.
function createIPCard(data) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";

  const img = document.createElement("img");
  img.src = "https://flagsapi.com/TR/shiny/64.png";
  cardDiv.appendChild(img);

  const cardInfoDiv = document.createElement("div");
  cardInfoDiv.className = "card-info";

  const ipH3 = document.createElement("h3");
  ipH3.className = "ip";
  ipH3.textContent = data.ip;
  cardInfoDiv.appendChild(ipH3);

  const countryP = document.createElement("p");
  countryP.className = "ulke";
  countryP.textContent = data.country_code;
  cardInfoDiv.appendChild(countryP);

  const latitudeP = document.createElement("p");
  latitudeP.textContent = "Enlem: " + data.enlem + " Boylam: " + data.boylam;
  cardInfoDiv.appendChild(latitudeP);

  const cityP = document.createElement("p");
  cityP.textContent = "Şehir: " + data.şehir;
  cardInfoDiv.appendChild(cityP);

  const timezoneP = document.createElement("p");
  timezoneP.textContent = "Saat dilimi: " + data.saatdilimi;
  cardInfoDiv.appendChild(timezoneP);

  const currencyP = document.createElement("p");
  currencyP.textContent = "Para birimi: " + data.parabirimi;
  cardInfoDiv.appendChild(currencyP);

  const ispP = document.createElement("p");
  ispP.textContent = "ISP: " + data.isp;
  cardInfoDiv.appendChild(ispP);

  cardDiv.appendChild(cardInfoDiv);
  return cardDiv;
}
//4.
async function addIPCardToDOM() {
  await ipAdresimiAl();
  const url = "https://apis.ergineer.com/ipgeoapi/" + benimIP;
  try {
    const response = await axios.get(url);
    const data = response.data;
    const ipCard = createIPCard(data);
    document.querySelector(".cards").appendChild(ipCard);
  } catch (error) {
    console.error("Error while fetching IP address details:", error);
  }
}
//5.
addIPCardToDOM();
