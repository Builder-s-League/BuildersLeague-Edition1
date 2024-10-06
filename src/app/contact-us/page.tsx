import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Contact() {
  return (
    <div className="flex flex-col items-center m-auto gap-8">
      <h1 className="text-4xl font-medium leading-none">Contact us</h1>
      <div className="flex flex-col items-center">
        <p className="text-m text-muted-foreground">Want to renew/cancel subscription?</p>
        <p className="text-m text-muted-foreground">Here is our contact information:</p>

        <Separator className="mt-2" />
        <div className="flex h-8 items-center space-x-4 text-sm w-full">
          <div className="w-1/2 h-4 flex justify-end">Email address</div>
          <Separator orientation="vertical" />
          <div className="w-1/2 h-4 flex justify-start">Contact Number</div>
        </div>
      </div>

      <Button>
        <a href="./">Go back</a>
      </Button>
    </div>
  )
}
