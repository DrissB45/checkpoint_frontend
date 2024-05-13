import { Continent } from "@/types/continent.type";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const GET_ALL_CONTINENTS = gql`
query Continents {
    continents {
      id
      name
    }
  }
`;

const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      name
      code
      emoji
    }
  }
`;

export default function NewCountry() {
    const router = useRouter();
    const { data } = useQuery(GET_ALL_CONTINENTS);
    const [addCountry] = useMutation(ADD_COUNTRY);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        emoji: ''
    });

    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await addCountry({
                variables: {
                    data: formData // Passer les données dans la structure attendue par la mutation
                },
                onCompleted: () => {
                    router.push('/');
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={submit} className="flex flex-col align-center text-center space-y-8 p-6">
            <h1 className="text-2xl">Ajoutez un pays :</h1>
            <label>
                Nom du pays :
                <input type="text" className="text-field" name="name" value={formData.name} onChange={handleChange} />
            </label><br />
            <label>
                Code du pays :
                <input type="text" className="text-field" name="code" value={formData.code} onChange={handleChange} />
            </label><br />
            <label>
                Emoji du pays :
                <input type="text" className="text-field" name="emoji" value={formData.emoji} onChange={handleChange} />
            </label>
            <label>
        Continent
        <select name="continentId">
          {data?.continents.map((continent: Continent) => (
            <option key={continent.id} value={continent.id}>{continent.name}</option>
          ))}
        </select>
        </label>
            <button className="button">Créer</button>
        </form>
    );
}
