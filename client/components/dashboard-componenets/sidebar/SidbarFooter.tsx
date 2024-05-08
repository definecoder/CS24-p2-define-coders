import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { darkestColor } from "@/data/constant";

export const SidbarFooter = () => {
    return (
        <div className="mt-auto p-4">
        <Card>
          <CardHeader className="p-2 pt-0 md:p-4">
            <CardTitle>Code Samurai 2024</CardTitle>
            <CardDescription>
              We are team define coders from SUST, SWE.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
            <Button size="sm" className={`w-full bg-[${darkestColor}]`}>
              Our Repo link
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  };