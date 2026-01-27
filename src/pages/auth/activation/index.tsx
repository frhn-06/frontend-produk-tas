"use client"

import AuthLayout from "@/components/layouts/AuthLayout";
import Activation from "@/components/views/Auth/Activation";
import AuthService from "@/services/auth.service";
// import { useRouter } from "next/router";

// const router = useRouter();

interface IProps {
  status: "success" | "failed";
}

export async function getServerSideProps(context: {query: {code: string}}) {
  try {
      const result = await AuthService.activation({code: context.query.code});
      if(result.data.data) {
        return {
          props: {
            status: "success"
          }
        }
      } else {
        return {
          props: {
            status: "failed"
          }
        }
      }
  } catch(error) {
    return {
      props: {
        status: "failed"
      }
    }
  }
}


const PageActivation = (props: IProps) => {
    return (
      <AuthLayout title="Velaro | Activation">
        <Activation {...props} />
      </AuthLayout>
    )
}





export default PageActivation;