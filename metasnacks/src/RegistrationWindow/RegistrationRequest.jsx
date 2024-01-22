const sendDataToServer = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/api/addData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Login: formData.Login,
          organisation_name: formData.organisation_name,
          ITN: formData.itn,
          password: formData.password, 
          role: 0
        }),
      });
  
      const data = await response.json();
      console.log('Data added:', data);
    } catch (error) {
      console.error('Error adding data', error);
    }
  };
  
  // Запустите функцию, например, при отправке формы
  sendDataToServer(formData);

