document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataForm');
    const dataList = document.getElementById('dataList');
    const infoInput = document.getElementById('infoInput');

    // Function to load data from localStorage (Fake NoSQL DB)
    const loadData = () => {
        const storedData = JSON.parse(localStorage.getItem('fakeDatabase')) || [];
        dataList.innerHTML = '';
        storedData.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `ID: ${index + 1} | Value: ${item}`;
    
            // Add delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "❌";
            deleteBtn.style.marginLeft = "10px";
            deleteBtn.onclick = () => {
                storedData.splice(index, 1); // Remove item from array
                localStorage.setItem('fakeDatabase', JSON.stringify(storedData)); // Save updated list
                loadData(); // Refresh UI
            };
    
            li.appendChild(deleteBtn);
            dataList.appendChild(li);
        });
    };
    

    // Load data on page load
    loadData();

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const info = infoInput.value.trim();
        if (!info) return; // Prevent empty inputs

        // Get current data from "fake database"
        let storedData = JSON.parse(localStorage.getItem('fakeDatabase')) || [];
        
        // Simulate NoSQL document insert (just push to array)
        storedData.push(info);

        // Save back to localStorage
        localStorage.setItem('fakeDatabase', JSON.stringify(storedData));

        // Refresh UI
        loadData();

        // Clear input
        infoInput.value = '';
    });
});

  