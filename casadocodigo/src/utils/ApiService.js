class ApiService {

    static async List() {

        try {

            const response = await fetch(`http://localhost:8000/api/autor`);

            const data = await response.json();

            if (data.message !== 'success')
                throw new Error('Não foi possível obter autores.');            

            return data.data;
        }
        catch(error) {

            console.log(error);
            throw new Error('Não foi possível obter autores.');
        }
    }

    static async Add(autor) {

        try {

            const response = await fetch(`http://localhost:8000/api/autor`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(autor)
            });

            const data = await response.json();

            if(data.message !== 'success')
                throw new Error('Não foi possível adicionar autor.');

            return data.data;
        }
        catch(error) {

            console.log(error);
            throw new Error('Não foi possível adicionar autor.');
        }
    }

    static async ListNomes() {

        try {

            const response = await fetch(`http://localhost:8000/api/autor/nome`);

            const data = await response.json();

            if (data.message !== 'success')
                throw new Error('Não foi possível obter nomes.');            

            return data.data;
        }
        catch (error) {

            console.log(error);
            throw new Error('Não foi possível obter nomes.');
        }        
    }

    static async ListLivros() {

        try {

            const response = await fetch(`http://localhost:8000/api/autor/livro`);

            const data = await response.json();

            if (data.message !== 'success')
                throw new Error('Não foi possível obter livros.');            

            return data.data;
        }
        catch (error) {

            console.log(error);
            throw new Error('Não foi possível obter livros.');
        }           
    }

    static async RemoveAutor(id) {

        try {

            const response = await fetch(`http://localhost:8000/api/autor/${id}`, {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' }
            });

            const data = await response.json();

            if(data.message !== 'deleted')
                throw new Error('Não foi possível remover o autor.');

            return data;
        }
        catch (error) {

            console.log(error);
            throw new Error('Não foi possível remover o autor.');
        }
    }
}

export default ApiService;