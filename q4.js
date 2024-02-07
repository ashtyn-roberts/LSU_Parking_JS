function getFreeLotTimes(lotName, freeThreshold) {
  // Find all tables on the page
  const tables = document.querySelectorAll('table');

  // Map to store availability for each day
  const availabilityByDay = new Map();

  // Iterate through each table
  tables.forEach(table => {
    // Find the button associated with the table
    const button = table.previousElementSibling;

    if (button && button.tagName === 'BUTTON') {
      const dayOfWeek = button.textContent.trim();

      // Find the rows in the table (skip the header row)
      const rows = table.querySelectorAll('tr:not(:first-child)');

      // Array to store available times for the current day
      const availableTimes = [];

      // Iterate through each row to find the specified parking lot
      rows.forEach(row => {
        const nameCell = row.querySelector('td:nth-child(1)');
        const occupancyCell = row.querySelector('td:nth-child(4)');

        if (nameCell && occupancyCell) {
          const name = nameCell.textContent.trim();
          const occupancyText = occupancyCell.textContent.trim();
          const occupancyPercentage = parseInt(occupancyText.replace('%', ''), 10);

          if (name === lotName && occupancyPercentage <= freeThreshold) {
            // Extract the time from the header row
            const time = row.querySelector('td:nth-child(3)').textContent.trim();
            availableTimes.push(time);
          }
        }
      });

      // Store available times for the current day
      availabilityByDay.set(dayOfWeek, availableTimes);
    }
  });

  // Print the results
  if (availabilityByDay.size === 0) {
    console.log("Uh-oh! No free lots. Sorry!!");
  } else {
    availabilityByDay.forEach((times, day) => {
      console.log(`${day}: ${times.join(', ')}`);
    });
  }
}

// Example usage:
getFreeLotTimes("West Stadium Lot", "20");
