

export default function Welcome({isNostalgic}) {
  return (
<>
    <section className="bloc">
        
          <img
            className="img-main"
            src={
              isNostalgic
                ? ""
                : "https://clecardona.com/summer_camp/eika/list.png"
            }
            alt="img-main"
          />

     
      </section>
    <div className="emptylist">

      <div className="description">
      <div className="hej" >Tere! </div>
      (Welcome) to EIKA, the famous Estonian furniture store.<br/>

        In the Shopping-List App,  you will be able to list items you plan to purchase in store. 
        This App replace the old version (1.0) that was : "a pen and a sheet".
        If you are nostalgic, feel free to to toggle the button on top of the page.<br/>
        <strong>Thank you for shopping with us ...</strong>
      </div>
      <p> Let's add your first item </p>
      <div className="arrowdown"></div>

    </div>
    </>
  );
}
