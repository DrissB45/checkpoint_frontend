import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import AllCountries from "@/components/AllCountries";

export default function Countries() {
    return (
        <>
            <Header />
            <AllCountries />
        </>
    );
}