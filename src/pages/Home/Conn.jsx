

response = await axios.get(url, {headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`}})