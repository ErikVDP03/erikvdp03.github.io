document.getElementById('add-strain-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newStrain = {
        name: event.target['strain-name'].value,
        producer: event.target['producer'].value,
        price: parseFloat(event.target['price'].value),
        type: event.target['type'].value,
        thc: parseFloat(event.target['thc'].value),
        pharmacy: event.target['pharmacy'].value,
        image: event.target['image'].value,
        rating: 0
    };
    // Save the new strain to localStorage
    let strains = JSON.parse(localStorage.getItem('strains')) || [];
    strains.push(newStrain);
    localStorage.setItem('strains', JSON.stringify(strains));
    alert('Strain added successfully');
    event.target.reset();
});

document.getElementById('remove-strain-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const strainNameToRemove = event.target['strain-name-remove'].value;
    // Remove the strain from localStorage
    let strains = JSON.parse(localStorage.getItem('strains')) || [];
    strains = strains.filter(strain => strain.name !== strainNameToRemove);
    localStorage.setItem('strains', JSON.stringify(strains));
    alert('Strain removed successfully');
    event.target.reset();
});
