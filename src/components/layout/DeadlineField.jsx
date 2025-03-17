import React from "react";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

function DeadlineField({ field }) {
    return (
        <FormItem>
            <FormLabel>Date limite</FormLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            variant="outline"
                            className="w-full flex justify-start text-left font-normal bg-muted-light dark:bg-muted-dark"
                        >
                            <Clock className="mr-2 h-4 w-4" />
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Choisir une date</span>
                            )}
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) => date < new Date()}
                    />
                </PopoverContent>
            </Popover>
            <FormMessage />
        </FormItem>
    );
}

export default DeadlineField;