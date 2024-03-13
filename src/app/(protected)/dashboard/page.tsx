"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { DashboardSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LucideSearch, User2Icon, ChevronsUpDownIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { SkeletonUser } from "@/app/(protected)/_components/skeleton_user_card";

const DashboardPage = () => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [language, setLanguage] = useState<string | undefined>("ENG");
  const [isFarenheit, setIsFarenheit] = useState<boolean | undefined>(false);

  const form = useForm<z.infer<typeof DashboardSchema>>({
    resolver: zodResolver(DashboardSchema),
    defaultValues: {
      city: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof DashboardSchema>) => {
    startTransition(() => {});
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-row w-full mt-2">
        <div className="flex flex-1 flex-row">
          {user ? (
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback>
                  <User2Icon className="text-black bg-slate-100" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2 justify-center">
                <h4
                  className="font-semibold text-sm"
                  style={{ color: "#f7f7f7" }}
                >
                  Hi {user?.name || ""}
                </h4>
                <span className="text-xl text-white">MON, 15 May, 2023</span>
              </div>
            </div>
          ) : (
            <SkeletonUser />
          )}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row justify-center items-center pb-0.5 bg-slate-100 rounded-full">
                    <LucideSearch
                      size={22}
                      className="ml-3"
                      style={{ marginTop: "0.1rem" }}
                    />
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Search City or Postcode"
                        className="outline-none shadow-none border-none focus-visible:ring-0"
                        disabled={isPending}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="w-[10px]"></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-slate-100 rounded-full flex flex-row justify-between items-center pr-2.5 w-[85px] focus-visible:ring-0 border-none"
            >
              <p className="mr-1">{language}</p>
              <ChevronsUpDownIcon size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>Language Preference</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={language}
              onValueChange={setLanguage}
            >
              <DropdownMenuRadioItem value="ENG">ENGLISH</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="TAM">TAMIL</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="SIN">SINHALA</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="w-[10px]"></div>
        <div>
          <Input
            onChange={(value) => console.log("Value: ", value)}
            type="checkbox"
            id="mode-toggle"
            className="invisible w-0 h-0"
          />
          <label
            htmlFor="mode-toggle"
            id="mode-label"
            className="w-[70px] h-[40px] relative block bg-slate-100 rounded-full shadow-md cursor-pointer after:w-[32px] after:h-[32px] after:absolute after:top-1 after:left-1 after:rounded-full"
          >
            <svg
              className="celcius"
              width="30px"
              height="30px"
              viewBox="0 0 76 76"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              baseProfile="full"
              enableBackground="new 0 0 76.00 76.00"
              xmlSpace="preserve"
            >
              <path
                fill="#000000"
                fillOpacity="1"
                strokeWidth="0.2"
                strokeLinejoin="round"
                d="M 19,47.5L 22.1667,47.5L 22.1667,52.25L 53.8333,52.25L 53.8333,47.5L 57,47.5L 57,55.4167L 19,55.4167L 19,47.5 Z M 40.0922,38.612L 40.7425,42.1442C 40.3311,42.348 39.6833,42.5389 38.7991,42.7168C 37.9148,42.8948 36.868,42.9896 35.6586,43.0013C 32.2164,42.9376 29.6239,41.9894 27.8812,40.1566C 26.1384,38.3239 25.2654,35.9889 25.2621,33.1518C 25.3369,29.8092 26.3898,27.2364 28.4209,25.4333C 30.4519,23.6303 33.0123,22.7187 36.102,22.6984C 37.2781,22.7086 38.288,22.8007 39.1316,22.9745C 39.9752,23.1483 40.6008,23.3426 41.0085,23.5574L 40.0626,27.1716L 38.4481,26.6691C 37.8157,26.5285 37.0927,26.4549 36.2793,26.4483C 34.464,26.4459 32.9664,26.9781 31.7866,28.045C 30.6068,29.1118 29.9959,30.7274 29.954,32.8918C 29.9694,34.8629 30.5298,36.4097 31.6351,37.5322C 32.7404,38.6547 34.2983,39.2265 36.3088,39.2476L 38.3779,39.0706L 40.0922,38.612 Z M 47.1436,22.6707C 48.4687,22.7043 49.5262,23.1234 50.3158,23.928C 51.1054,24.7326 51.51,25.7215 51.5296,26.8945C 51.4931,28.1725 51.0497,29.2047 50.1995,29.9911C 49.3492,30.7776 48.3113,31.1822 47.0856,31.2049C 45.786,31.1749 44.7359,30.7631 43.9354,29.9693C 43.1349,29.1755 42.723,28.1794 42.6999,26.9811C 42.7162,25.7538 43.1413,24.7361 43.9752,23.9279C 44.8091,23.1197 45.8652,22.7006 47.1436,22.6707 Z M 47.0856,24.7026C 46.4545,24.7219 45.9556,24.9502 45.589,25.3876C 45.2224,25.825 45.0352,26.3562 45.0274,26.9811C 45.04,27.6149 45.2393,28.1353 45.6252,28.542C 46.0112,28.9488 46.5076,29.1591 47.1146,29.1729C 47.7342,29.1597 48.2343,28.9482 48.6149,28.5384C 48.9955,28.1287 49.1912,27.5999 49.2021,26.9522C 49.2009,26.3538 49.022,25.8347 48.6656,25.3948C 48.3092,24.955 47.7825,24.7243 47.0856,24.7026 Z "
              />
            </svg>
            <svg
              className="farenheit"
              width="30px"
              height="30px"
              viewBox="0 0 76 76"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              baseProfile="full"
              enableBackground="new 0 0 76.00 76.00"
              xmlSpace="preserve"
            >
              <path
                fill="#000000"
                fillOpacity="1"
                strokeWidth="0.2"
                strokeLinejoin="round"
                d="M 19,47.5L 22.1667,47.5L 22.1667,52.25L 53.8333,52.25L 53.8333,47.5L 57,47.5L 57,55.4167L 19,55.4167L 19,47.5 Z M 26.7399,42.7315L 26.7399,22.994L 38.7916,22.994L 38.7916,26.7438L 31.1362,26.7438L 31.1362,31.2418L 38.2891,31.2418L 38.2891,34.7515L 31.1362,34.7515L 31.1362,42.7315L 26.7399,42.7315 Z M 45.6658,22.6707C 46.991,22.7043 48.0484,23.1234 48.838,23.928C 49.6277,24.7326 50.0323,25.7215 50.0518,26.8945C 50.0153,28.1725 49.5719,29.2047 48.7217,29.9911C 47.8714,30.7776 46.8335,31.1822 45.6078,31.2049C 44.3082,31.1749 43.2581,30.7631 42.4576,29.9693C 41.6571,29.1755 41.2453,28.1794 41.2221,26.9811C 41.2384,25.7538 41.6635,24.7361 42.4974,23.9279C 43.3313,23.1197 44.3874,22.7006 45.6658,22.6707 Z M 45.6078,24.7026C 44.9767,24.7219 44.4778,24.9502 44.1112,25.3876C 43.7446,25.825 43.5574,26.3562 43.5496,26.9811C 43.5623,27.6149 43.7616,28.1353 44.1475,28.542C 44.5334,28.9488 45.0298,29.1591 45.6368,29.1729C 46.2565,29.1597 46.7566,28.9482 47.1371,28.5384C 47.5177,28.1287 47.7134,27.5999 47.7243,26.9522C 47.7231,26.3538 47.5443,25.8346 47.1879,25.3948C 46.8315,24.955 46.3048,24.7243 45.6078,24.7026 Z "
              />
            </svg>
          </label>
          <div className="background"></div>
        </div>
      </div>
      <div>Hello</div>
    </div>
  );
};

export default DashboardPage;
