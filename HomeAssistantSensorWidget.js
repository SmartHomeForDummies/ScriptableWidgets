let widget = await createWidget()
let detailColor = Color.white();
if (!config.runsInWidget) {
    await widget.presentSmall();
}

Script.setWidget(widget);
Script.complete();

async function createWidget(items) {
  
    /* Input Parameter START
    
    - Home Assistant domain ->  replace ha-domain.com
    - Home Assistant ->         Bearer Token repleace TOKEN
    - Sensor Entity ->          repleace sensor.xyz
    - Sensor unit ->            repleace UNIT
    - Widget Title ->           repleace MY TITLE
    
     */

    let req = new Request("https://ha-domain.com/api/states")
    req.headers = { "Authorization": "Bearer TOKEN", "content-type": "application/json" }
    let json = await req.loadJSON();
    let data  = findEntity(json, "sensor.xyz");
    let unit = "UNIT";
    let title = "MY TITLE";
    let not_available = "??"
    let titleFontSize = 18;
    let dataFontSize = 28;
    let titleColor = Color.blue();
    let dataColor = Color.red();
    let widget_color = Color.black()
 

   /* Input Parameter END */

    /* Create the widget */
    const widget = new ListWidget();
    widget.backgroundColor = widget_color;
    
    const titleLabel = widget.addText(title);
    titleLabel.font = Font.mediumRoundedSystemFont(titleFontSize);
    titleLabel.textColor = titleColor;
    titleLabel.centerAlignText();
    
    widget.addSpacer()
    
    let dataLabel = data.state
    let mytext = null
    if (dataLabel == 'unavailable' || dataLabel == 'unknown') {
        mytext = widget.addText(not_available);
    } else {
        mytext = widget.addText(dataLabel + " " + unit);
    }

    mytext.font = Font.heavyMonospacedSystemFont(dataFontSize);
    mytext.textColor = dataColor;
    mytext.centerAlignText();


    return widget;
}


function findEntity(json, entity_name) {
    for (let i = 0; i < json.length; i++) {
        if (json[i]['entity_id'] == entity_name) {
            return json[i]
        }
    }
}
