###Labb 3, 1dv449 Webbteknik II
####Andreas Bom, ab22cw   
   
####Reflektionsfrågor   
######Vad finns det för krav du måste anpassa dig efter i de olika API:erna?     
Sveriges Radio har inga begränsningar i antal API anrop, men de uppmanar utvecklare att begränsa antalet API anrop, och inte göra onödiga anrop. OpenStreetMap har som krav att kartan har en källhänvisning ( “© OpenStreetMaps bidragsgivare”). Vidare så krävs det att licensen görs tillgänglig, tex genom att visa länken till http://www.openstreetmap.org/copyright.    

######Hur och hur länga cachar du ditt data för att slippa anropa API:erna i onödan?     
En stor del av interaktiviteten efter en request sker på klienten med javascript, vilket innebär att normalanvändaren gör en request/användningstillfälle. Det innebär att antalet användare har betydelse för hur många requsts som görs mot SR. Jag har valt att cacha datan på servern under 10 minuter.    

######Vad finns det för risker kring säkerhet och stabilitet i din applikation?    
Jag validerar inte data som kommer från SR. Om någon hackar SR's API och skickar ut skadlig kod via Jsonfilen, skulle detta kunna hamna på min sida. Ang. stabilitet så förlitar jag mig på CDN när det gäller script och css från leaflet. Egentligen borde jag ha en fallback funktion som, om CDN länken går ner, så läses skripten från egna servern istället.    


######Hur har du tänkt kring säkerheten i din applikation?    
Initialt tänkte jag att eftersom jag inte har några indatafält, så finns ingen risk för injections. Men efter att ha läst på så förstår jag att det skulle vara möjligt att API'et skickar kod som kan anses som skadlig. Man ska aldrig lita på data, utan denna ska alltid valideras. Vilket jag inte har gjort.     

######Hur har du tänkt kring optimeringen i din applikation?    
Jag har miniferat javascript- och css-filer (Jag har låtit Visual Studio göra detta innan publicering). Jag placerar i så stor mån det är möjligt, css i head-taggen och javascript i slutet på dokumentet. En viktig del har också varit att minska antalet HTTP-requests, genom att data hämtas en gång, och sedan sker interaktiviteten på klienten m.h.a. javascript.     
