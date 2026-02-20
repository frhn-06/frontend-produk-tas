import PageHead from "@/components/commons/PageHead/PageHead"
import NavbarLayout from "./NavbarLayout";
import useLandingPageLayout from "./useLandingPageLayout";
import SloganAtas from "@/components/ui/SloganAtas";

interface TypeProps {
  title: string;
  children: React.ReactNode;
}

const LandingPageLayout = (props: TypeProps) => {
    const {
      title,
      children
    } = props;

    const {
      dataUser,
      isLoadingUser
    } = useLandingPageLayout()


    return (
      <section>
        <PageHead title={title} />

        <div className="min-h-900 bg-default-100">
          <SloganAtas />
          

          <NavbarLayout user={dataUser?.data} isLoadingUser={isLoadingUser} />

          <div>
            {children}
          </div>
        </div>
      </section>
    )
      
    
}


export default LandingPageLayout;