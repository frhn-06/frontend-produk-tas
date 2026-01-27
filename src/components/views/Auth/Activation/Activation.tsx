import { Button, cn } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface TypeProps {
  status: "success" | "failed"
}

const Activation = (props: TypeProps) => {
    const {
      status
    } = props;

    const router = useRouter();


    return (
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className={cn("font-bold text-3xl text-primary", {"text-danger" : status === "failed"})}>
          {status === "success" ? "Success Activation" : "Failed Activation"}
        </h1>
        <Button className="w-fit font-semibold" variant="flat" color={status === "failed" ? "danger" : "primary"} onPress={() => router.push(status === "success" ? "/auth/login" : "/")}>
          {status === "success" ? "Login" : "Back to Home"}
        </Button>
      </div>
    )
}

export default Activation;