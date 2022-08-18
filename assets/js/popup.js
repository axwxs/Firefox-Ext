
// $(window).on("load", ()=>{
$(document).ready(()=>{
	const listElement = $('#alarmsList');

	browser.storage.sync.get(['alarms']).then((result) => {
			if (result.hasOwnProperty('alarms') && result.alarms) {
				// Get current time
				const minutes = (new Date).getMinutes().toString().padStart(2, '0');
				const hours = (new Date).getHours().toString().padStart(2, '0');
				const now = new Date('1970-01-01T' + hours + ':' + minutes + 'Z').getTime();

				// Loops over alarms and displays them
				result.alarms.forEach((alarm, index) => {
					const alarmTime = new Date('1970-01-01T' + alarm.time + 'Z').getTime();
					if (alarmTime > now) {
						appendItem(alarm.content, alarm.time, index)
					}
				});
			} else {
			// Show no items available
			appendItem('No alarms set')
			}
		});

	$("#optionsLink").on('click', () => {
		browser.runtime.openOptionsPage();
	});
		
	function appendItem(content, badgeContent = null, id = null) {
		console.log(id) // Debugging
		listElement.append(`
		<li class="list-group-item d-flex justify-content-between align-items-center alarm-item" ${id !== null ? `id="alarm_${id}"` : ''}> 
			${content}
			${badgeContent ? 
			`<div>
				<span class="badge bg-primary rounded-pill">${badgeContent}</span>
		        <button class="trash-btn p-0"><img src="assets/images/trash.svg" alt="delete" /></button>
			</div>` : ''}
		</li>`);
	}


	$('body').on('click', '.trash-btn', function () {
		console.log('Delete button clicked') // Debugging
		const parent = $(this).parents('.alarm-item');
		console.log(parent) // Debugging
		const parentId = parent.attr('id');
		console.log(parentId) // Debugging
		const alarmIndex = parentId.split('_')[1];

		// Get alarms from storage
		browser.storage.sync.get(['alarms'])
			.then((result) => {
				let alarms = [];
				let alarmName = "";
				if (result.alarms && result.alarms.length > alarmIndex) {
					alarmName = result.alarms[alarmIndex].alarmName;
					result.alarms.splice(alarmIndex, 1);
				}
				// Cancel the alarm
				browser.storage.sync.set({alarms})
					.then(() => {
						// Remove alarm by name
						browser.alarms.clear(alarmName);
						// Remove alarm item from list
						parent.remove();
					});
			});
	})

});



