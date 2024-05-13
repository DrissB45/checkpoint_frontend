import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Country } from "@/types/country.type";
import Link from "next/link";

const GET_ALL_COUNTRIES = gql`
query Countries {
    countries {
      name
      emoji
      code
    }
  }
`;

export default function AllCountries() {
    const [countries, setCountries] = useState<Country[]>([]);

    const { loading, error } = useQuery(GET_ALL_COUNTRIES, {
        onCompleted: (data => {
            setCountries(data.countries);
        })
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>; // Afficher le message d'erreur

    return (
        <>
            <div className="flex flex-col align-center text-center p-6 space-y-6">
                <h2 className="text-3xl">Tous les pays :</h2>
                {countries.map((country, index) => (
                    <div key={index}>
                        <Link href={`/${country.code}`}>
                        <span className="text-xl">{country.name} </span>
                        <span className="text-xl">{country.emoji}</span>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}