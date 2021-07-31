

export default function Welcome({isNostalgic}) {

  const url = "https://clecardona.com/summer_camp/eika/welcome_square.jpg"

  return (
<>
    <section className="bloc">
        
          <img
            className="img-main"
            src={
              isNostalgic
                ? ""
                : url
            }
            alt="img-main"
          />

     
      </section>
    <div className="emptylist">

      <div className="description">
      <div className="hej" >Tere! </div>
      (Welcome) to EIKA, the famous Estonian furniture store.<br/>

        In the Shopping-List App, you will be able to list items you plan to purchase in store. 
        This App 2.0 replace the version 1.0 that was : "a pen and a sheet".<br/>
        Nostalgic ? Toggle the button on top of the page.<br/>
        <strong>Thank you for shopping with us ...</strong>
      </div>
      <div className="arrowdown"></div>

    </div>
    </>
  );
}
