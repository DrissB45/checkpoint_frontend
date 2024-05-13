import { Country } from "@/types/country.type";
import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const GET_ONE_COUNTRY = gql`
  query Country($id: ID!) {
    country(id: $getCountryId) {
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
            getCountryId: Number(id)
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
            <h2>Pays sélectionné :</h2>
            <div>
                <div>
                    <span>{country?.name} </span>
                    <span>{country?.emoji}</span>
                </div>
            </div>
        </>
    );
}
