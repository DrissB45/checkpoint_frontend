import Header from "@/components/Header";
import { Country } from "@/types/country.type";
import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const GET_ONE_COUNTRY = gql`
query Country($code: String!) {
    country(code: $code) {
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;

export default function OneCountry() {
    const router = useRouter();
    const { id } = router.query;
    const [country, setCountry] = useState<Country | null>(null);

    const [getCountry, { loading, error }] = useLazyQuery(GET_ONE_COUNTRY, {
        variables: {
            code: String(id)
        },
        onCompleted: (data: { country: Country }) => {
            setCountry(data.country);
        },
    });

    useEffect(() => {
        if (id) {
            getCountry();
        }
    }, [id])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>; // Afficher le message d'erreur

    return (
        <>
            <Header />
            <div>
                <div className="flex flex-col align-center text-center p-6 space-y-6">
                    <span className="text-4xl">{country?.emoji}</span>
                    <span className="text-2xl">Nom : {country?.name} </span>
                    <span className="text-2xl">Continent : {country?.continent.name}</span>
                </div>
            </div>
        </>
    );
}
