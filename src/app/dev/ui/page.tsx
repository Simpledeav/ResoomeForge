"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  FileText,
  Download,
  Eye,
  Settings,
  Palette,
  Sun,
  Moon,
} from "lucide-react";

const sectionTitle = (title: string) => (
  <div className="flex flex-col gap-1">
    <h2 className="h3 text-foreground">{title}</h2>
    <Separator />
  </div>
);

export default function DevUI() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-12 flex flex-col gap-2">
        <span className="caption text-muted-foreground">
          Design System QA
        </span>
        <h1 className="h1 text-foreground">Component Gallery</h1>
        <p className="body-lg text-muted-foreground">
          Every themed shadcn primitive for visual QA. Light/dark toggle to
          verify both modes.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        {/* ===== BUTTONS ===== */}
        <section>
          {sectionTitle("Buttons")}
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button size="xs">XS</Button>
            <Button size="sm">SM</Button>
            <Button size="default">Default</Button>
            <Button size="lg">LG</Button>
            <Button size="icon" aria-label="Settings">
              <Settings className="size-4" />
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        {/* ===== INPUTS ===== */}
        <section>
          {sectionTitle("Inputs")}
          <div className="mt-4 flex max-w-sm flex-col gap-3">
            <Input placeholder="Placeholder text" />
            <Input placeholder="Disabled" disabled />
            <Input placeholder="With value" defaultValue="Some value" />
          </div>
        </section>

        {/* ===== SELECT ===== */}
        <section>
          {sectionTitle("Select")}
          <div className="mt-4 flex gap-3">
            <Select defaultValue="option-1">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option-1">Option 1</SelectItem>
                <SelectItem value="option-2">Option 2</SelectItem>
                <SelectItem value="option-3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* ===== BADGES ===== */}
        <section>
          {sectionTitle("Badges")}
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge variant="link">Link</Badge>
          </div>
        </section>

        {/* ===== SWITCH ===== */}
        <section>
          {sectionTitle("Switch")}
          <div className="mt-4 flex items-center gap-4">
            <Switch defaultChecked />
            <Switch />
            <Switch size="sm" defaultChecked />
            <Switch size="sm" />
            <Switch disabled />
            <Switch disabled defaultChecked />
          </div>
        </section>

        {/* ===== SLIDER ===== */}
        <section>
          {sectionTitle("Slider")}
          <div className="mt-4 max-w-xs">
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>
        </section>

        {/* ===== SEPARATOR ===== */}
        <section>
          {sectionTitle("Separator")}
          <div className="mt-4 flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              Horizontal separator above this text, vertical separator to the
              right.
            </p>
            <Separator />
            <div className="flex h-8 items-center gap-3">
              <span className="text-sm">Left</span>
              <Separator orientation="vertical" />
              <span className="text-sm">Right</span>
            </div>
          </div>
        </section>

        {/* ===== CARDS ===== */}
        <section>
          {sectionTitle("Cards")}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Resume Title</CardTitle>
                <CardDescription>Last edited 2 hours ago</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A professional resume for frontend engineering roles.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="size-3" />
                  Preview
                </Button>
                <Button size="sm">
                  <Download className="size-3" />
                  Export
                </Button>
              </CardFooter>
            </Card>
            <Card size="sm">
              <CardHeader>
                <CardTitle>Compact Card</CardTitle>
                <CardDescription>Small variant</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A more compact card size for dense layouts.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ===== TABS ===== */}
        <section>
          {sectionTitle("Tabs")}
          <div className="mt-4">
            <Tabs defaultValue="tab-1">
              <TabsList>
                <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab-3" disabled>
                  Disabled
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab-1" className="mt-3">
                <p className="text-sm text-muted-foreground">
                  Tab 1 content area.
                </p>
              </TabsContent>
              <TabsContent value="tab-2" className="mt-3">
                <p className="text-sm text-muted-foreground">
                  Tab 2 content area.
                </p>
              </TabsContent>
            </Tabs>

            <Tabs defaultValue="tab-1" className="mt-6">
              <TabsList variant="line">
                <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
              </TabsList>
              <TabsContent value="tab-1" className="mt-3">
                <p className="text-sm text-muted-foreground">
                  Line variant tabs.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* ===== TOOLTIP ===== */}
        <section>
          {sectionTitle("Tooltip")}
          <div className="mt-4 flex gap-3">
            <Tooltip>
              <TooltipTrigger
                render={<Button variant="outline" size="sm" />}
              >
                Hover me
              </TooltipTrigger>
              <TooltipContent>
                <p>Tooltip content</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </section>

        {/* ===== DROPDOWN ===== */}
        <section>
          {sectionTitle("Dropdown Menu")}
          <div className="mt-4 flex gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" size="sm" />}
              >
                <Settings className="size-3" />
                Options
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>

        {/* ===== DIALOG ===== */}
        <section>
          {sectionTitle("Dialog")}
          <div className="mt-4 flex gap-3">
            <Dialog>
              <DialogTrigger
                render={<Button variant="outline" size="sm" />}
              >
                Open Dialog
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Export</DialogTitle>
                  <DialogDescription>
                    This will download your resume as a PDF file. Are you
                    sure you want to proceed?
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button size="sm">Export</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* ===== TOAST ===== */}
        <section>
          {sectionTitle("Toast (Sonner)")}
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.success("Resume exported successfully!")}
            >
              Success Toast
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.error("Export failed. Please try again.")}
            >
              Error Toast
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.info("Your changes have been saved.")}
            >
              Info Toast
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                toast("Custom action", {
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                  },
                })
              }
            >
              Action Toast
            </Button>
          </div>
        </section>

        {/* ===== ICON DISPLAY ===== */}
        <section>
          {sectionTitle("Icons (Lucide)")}
          <div className="mt-4 flex flex-wrap gap-4">
            {[FileText, Download, Eye, Settings, Palette, Sun, Moon].map(
              (Icon) => (
                <div
                  key={Icon.displayName}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border"
                >
                  <Icon className="size-4 text-foreground" />
                </div>
              ),
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
