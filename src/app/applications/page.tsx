"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  Building2,
} from "lucide-react";

interface ApplicationCard {
  id: string;
  company: string;
  role: string;
  status: string;
  date: string;
}

const STATUS_COLUMNS = [
  {
    key: "PREPARING",
    label: "准备中",
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dotColor: "bg-amber-400",
  },
  {
    key: "APPLIED",
    label: "已投递",
    icon: Send,
    gradient: "from-blue-500 to-cyan-500",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    dotColor: "bg-blue-400",
  },
  {
    key: "INTERVIEWING",
    label: "面试中",
    icon: MessageSquare,
    gradient: "from-violet-500 to-purple-500",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
    dotColor: "bg-violet-400",
  },
  {
    key: "CLOSED",
    label: "已结束",
    icon: CheckCircle2,
    gradient: "from-slate-400 to-slate-500",
    badge: "bg-slate-100 text-slate-600 border-slate-200",
    dotColor: "bg-slate-400",
  },
];

const MOCK_APPLICATIONS: ApplicationCard[] = [
  { id: "1", company: "ByteDance", role: "高级前端工程师", status: "PREPARING", date: "2026-03-10" },
  { id: "2", company: "Alibaba", role: "全栈开发工程师", status: "APPLIED", date: "2026-03-08" },
  { id: "3", company: "Tencent", role: "前端架构师", status: "INTERVIEWING", date: "2026-03-01" },
  { id: "4", company: "Meituan", role: "React 开发工程师", status: "APPLIED", date: "2026-03-05" },
  { id: "5", company: "PDD", role: "前端技术专家", status: "CLOSED", date: "2026-02-20" },
];

export default function ApplicationsPage() {
  const [applications] = useState<ApplicationCard[]>(MOCK_APPLICATIONS);

  const getCardsByStatus = (status: string) =>
    applications.filter((app) => app.status === status);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">投递看板</h1>
          <p className="text-sm text-muted-foreground">
            追踪你的每一次投递，直观掌握求职全流程
          </p>
        </div>
        <Button className="shadow-sm shadow-indigo-500/20">
          <Plus className="mr-2 h-4 w-4" />
          新增投递
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {STATUS_COLUMNS.map((col) => {
          const count = getCardsByStatus(col.key).length;
          return (
            <div
              key={col.key}
              className="flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${col.gradient} text-white shadow-sm`}
              >
                <col.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-xs text-muted-foreground">{col.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {STATUS_COLUMNS.map((column) => {
          const cards = getCardsByStatus(column.key);
          return (
            <div key={column.key} className="space-y-3">
              {/* Column Header */}
              <div className="flex items-center gap-2.5 px-1">
                <div className={`h-2 w-2 rounded-full ${column.dotColor}`} />
                <h2 className="text-sm font-semibold">{column.label}</h2>
                <Badge
                  variant="secondary"
                  className="ml-auto h-5 rounded-md px-1.5 text-[10px] font-bold"
                >
                  {cards.length}
                </Badge>
              </div>

              {/* Cards */}
              <div className="space-y-2.5">
                {cards.map((app) => (
                  <Card
                    key={app.id}
                    className="cursor-pointer border-transparent bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                          <Building2 className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="truncate text-sm font-semibold">
                            {app.company}
                          </CardTitle>
                          <CardDescription className="truncate text-xs">
                            {app.role}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardFooter className="px-4 pb-3 pt-1">
                      <div className="flex w-full items-center justify-between">
                        <span className="text-[11px] text-muted-foreground">
                          {app.date}
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${column.badge}`}
                        >
                          {column.label}
                        </Badge>
                      </div>
                    </CardFooter>
                  </Card>
                ))}

                {cards.length === 0 && (
                  <div className="flex h-28 items-center justify-center rounded-xl border border-dashed bg-muted/20">
                    <p className="text-xs text-muted-foreground">暂无记录</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
