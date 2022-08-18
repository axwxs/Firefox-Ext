

browser.alarms.onAlarm.addListener((alarmInfo) => {
    const alarmName = alarmInfo.name.split('_')[0];
    console.log(alarmInfo.scheduledTime + "\n" + alarmName);
    console.log(alarmName);

    // Send notification
    browser.notifications.create({
        type: 'basic',
        title: alarmName,
        message: "Times Up!"
    });

    // let createData = {
    //     type: "detached_panel",
    //     url: "panel.html",
    //     width: 250,
    //     height: 100
    // };
    // let creating = browser.windows.create(createData);


    // let createData = {
    //
    //     url: ["https://google.com"]
    //
    // };
    // let creating = browser.windows.create(createData);

});

