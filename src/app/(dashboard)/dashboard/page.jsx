"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Correct import for next/router
import CreateRestaurent from "./_components/CreateRestaurent";
import { getRestaurent } from "@/actions/Action";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { status, data } = useSession();
  const router = useRouter();
  const [restaurantName, setRestaurantName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (status === "authenticated") {
          const Restaurent = await getRestaurent("email", data?.user?.email);
          console.log(Restaurent, "Restaurent");
          const fetchedRestaurantName = Restaurent?.restaurantName || null;
          setRestaurantName(fetchedRestaurantName);
        }
      } catch (error) {
        console.error("Error loading restaurant data:", error);
      }
    };

    fetchData();
  }, [status, data]);

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "authenticated") {
    if (restaurantName !== null) {
      router.push(`/dashboard/${restaurantName}`);
    } else {
      return <CreateRestaurent />;
    }
  } else {
    router.push("/dashboard/signin");
    return null;
  }
}
