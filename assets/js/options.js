
$(document).ready(() => {
	const nameElm = $('#name');
	const timeElm = $('#time');
	const formElm = $('form');

	formElm.on('submit', () => {
		// Remove previous success alerts if any exist
		$('.alert').remove();
		const self = this;

		// Get existing alarms
		browser.storage.sync.get(['alarms'])
			.then((result) => {
				let alarms = result.alarms;
				const alarmName = nameElm.val().trim() + '_' + (Math.random() * 1000000);

				if (!alarms) {
					alarms = [];
				}
				alarms.push({
					content: nameElm.val().trim(),
					time: timeElm.val(),
					alarmName
				});

				// Set alarms in the storage
				browser.storage.sync.set({alarms})
					.then(() => {
						// Create a new alarm and schedule notification
						const currentDate = new Date;
						const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
						const currentDay = (currentDate.getDate()).toString().padStart(2, '0');
						browser.alarms.create(alarmName, {
							when: new Date(currentDate.getFullYear() + '-' + currentMonth + '-' + currentDay + 'T' +
								timeElm.val()).getTime(),
							periodInMinutes: 1440
						});

						// Notifies user if alarm is added and clears the form's input values
						formElm.prepend('<div class="alert alert-success">Alarm added successfully</div>');
						nameElm.val('');
						timeElm.val('');
					});
			});

		// Disable default form submit action
		return false;
	});
});


