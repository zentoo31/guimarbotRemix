import type { MetaFunction } from "@remix-run/node";
import {Accordion, AccordionItem} from "@nextui-org/react";
import {DatePicker} from "@nextui-org/react";
import {Pagination} from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Iniciar Sesión" },
    { name: "página de inicion de sesión", content: "Bienvenido a guimarbot" },
  ];
};

function register() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <div className="animate-fade-in-down">
      <Accordion>
      <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
        {defaultContent}
      </AccordionItem>
    </Accordion>
    <DatePicker 
          label="Birth date"
          className="max-w-[284px]"
          isRequired
        />
    <Pagination total={10} initialPage={1} />
    <Button color="primary">
      Button
    </Button>
    </div>
  )
}

export default register