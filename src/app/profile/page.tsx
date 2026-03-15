"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, User, Briefcase, Code2, GraduationCap } from "lucide-react";

interface ProjectEntry {
  id: string;
  name: string;
  role: string;
  period: string;
  description: string;
  highlights: string;
}

function createEmptyProject(): ProjectEntry {
  return {
    id: crypto.randomUUID(),
    name: "",
    role: "",
    period: "",
    description: "",
    highlights: "",
  };
}

export default function ProfilePage() {
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  });

  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState<ProjectEntry[]>([
    createEmptyProject(),
  ]);

  const addProject = () => {
    setProjects((prev) => [...prev, createEmptyProject()]);
  };

  const removeProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProject = (
    id: string,
    field: keyof ProjectEntry,
    value: string
  ) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">履历素材库</h1>
          <p className="text-sm text-muted-foreground">
            在这里维护你的全量简历数据，AI 将从中提取最匹配目标岗位的内容
          </p>
        </div>
        <Button className="shadow-sm shadow-indigo-500/20">
          <Save className="mr-2 h-4 w-4" />
          保存全部
        </Button>
      </div>

      {/* 基本信息 */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <User className="h-4.5 w-4.5" />
            </div>
            <div>
              <CardTitle className="text-base">基本信息</CardTitle>
              <CardDescription>你的联系方式和个人概述</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">姓名</label>
            <Input
              placeholder="张三"
              value={basicInfo.name}
              onChange={(e) =>
                setBasicInfo((s) => ({ ...s, name: e.target.value }))
              }
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">邮箱</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={basicInfo.email}
              onChange={(e) =>
                setBasicInfo((s) => ({ ...s, email: e.target.value }))
              }
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">电话</label>
            <Input
              placeholder="+86 138xxxxxxxx"
              value={basicInfo.phone}
              onChange={(e) =>
                setBasicInfo((s) => ({ ...s, phone: e.target.value }))
              }
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">所在地</label>
            <Input
              placeholder="北京"
              value={basicInfo.location}
              onChange={(e) =>
                setBasicInfo((s) => ({ ...s, location: e.target.value }))
              }
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-sm font-medium">个人简介</label>
            <Textarea
              placeholder="用 2-3 句话概述你的职业定位和核心优势..."
              rows={3}
              value={basicInfo.summary}
              onChange={(e) =>
                setBasicInfo((s) => ({ ...s, summary: e.target.value }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* 技能标签 */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Code2 className="h-4.5 w-4.5" />
            </div>
            <div>
              <CardTitle className="text-base">技能库</CardTitle>
              <CardDescription>列出你掌握的所有技术栈和软技能</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="用逗号分隔技能，如：React, TypeScript, Node.js, PostgreSQL, 团队管理"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          {skills && (
            <div className="flex flex-wrap gap-2 pt-1">
              {skills
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
                .map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                  >
                    {skill}
                  </Badge>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 项目经历 */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Briefcase className="h-4.5 w-4.5" />
              </div>
              <div>
                <CardTitle className="text-base">项目经历</CardTitle>
                <CardDescription>
                  尽量多地填写，AI 会自动筛选最匹配的
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={addProject}
              className="shadow-sm"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              添加项目
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="space-y-4 rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-100 text-xs font-bold text-indigo-600">
                    {idx + 1}
                  </div>
                  <span className="text-sm font-medium">
                    {project.name || "新项目"}
                  </span>
                </div>
                {projects.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    项目名称
                  </label>
                  <Input
                    placeholder="智能推荐系统"
                    value={project.name}
                    onChange={(e) =>
                      updateProject(project.id, "name", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    担任角色
                  </label>
                  <Input
                    placeholder="前端负责人"
                    value={project.role}
                    onChange={(e) =>
                      updateProject(project.id, "role", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    时间段
                  </label>
                  <Input
                    placeholder="2023.06 - 2024.03"
                    value={project.period}
                    onChange={(e) =>
                      updateProject(project.id, "period", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  项目描述
                </label>
                <Textarea
                  placeholder="简述项目背景、技术栈和你的核心贡献..."
                  rows={2}
                  value={project.description}
                  onChange={(e) =>
                    updateProject(project.id, "description", e.target.value)
                  }
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  亮点 / 量化成果
                </label>
                <Textarea
                  placeholder={"每条一行，例如：\n• 将页面加载速度优化 40%\n• 主导从 0 到 1 搭建前端监控体系"}
                  rows={2}
                  value={project.highlights}
                  onChange={(e) =>
                    updateProject(project.id, "highlights", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
