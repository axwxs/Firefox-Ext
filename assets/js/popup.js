
$(document).ready(()=>{
	const listElement = $('#alarmsList')
	
	
	browser.storage.sync.get(['alarms'])
		.then((result) => {
			if (result.alarms && result.alarms.length) {
				// Loops over alarms and displays them
				result.alarms.forEach((alarm) => {
					appendItem(alarm.content, alarm.time)
				})
			} else {
			// Show no items available
			appendItem('No alarms are available')
			}
		})
		
	function appendItem(content, badgeContent = null) {
		listElement.append(`
		<li class="list-group-item d-flex justify-content-between align-items-center"> 
			${content} 
			${badgeContent ? `<span class="badge bg-primary rounded-pill">${badgeContent}</span>` : ''} 
		</li>`)
	}
	
	
})

