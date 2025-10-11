// app/components/Footer.js
export default function Footer() {
  return (
    <footer>
      <div className="allboxfooter">
        <div className="upbox">
          <div className="boximgoil">
            <img src="/img/oil.png" alt="logo AGMAR" />
          </div>
          <div className="box1footer">
            <p className="namefooter">| AGMAR |</p>
            <div className="rightbox">
              <p>Sprzedaż i dostawa paliw</p>
              <p>Śląsk i małopolska</p>
              <p>16 lat doświadczenia</p>
            </div>
          </div>
        </div>
        <div className="downbox">
          <p>+48 501 060 285</p>
          <p>
            42-440 Ogrodzieniec <br /> ul. Słowackiego 13a
          </p>
        </div>
      </div>
    </footer>
  );
}

