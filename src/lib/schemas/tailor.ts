import { z } from "zod";

export const tailorResultSchema = z.object({
  tailoredSummary: z
    .string()
    .describe("一段 100 字左右的个人优势总结，高度贴合目标 JD 的核心诉求，突出候选人最具竞争力的能力"),

  matchedSkills: z
    .array(z.string())
    .describe("从候选人全量技能库中精准挑选出与 JD 匹配的技能关键词列表"),

  selectedProjects: z
    .array(
      z.object({
        projectName: z.string().describe("项目名称"),
        role: z.string().describe("候选人在该项目中的角色"),
        tailoredBullets: z
          .array(z.string())
          .max(3)
          .describe(
            "根据 JD 重新润色的项目描述，严格遵循 STAR 法则（情境-任务-行动-结果），每条包含具体动作和量化结果，最多 3 条"
          ),
      })
    )
    .max(3)
    .describe("从全量项目中挑选出最匹配 JD 核心诉求的项目，最多 3 个"),

  interviewPreparation: z.object({
    highFrequencyQuestions: z
      .array(z.string())
      .length(3)
      .describe("基于简历与 JD 的契合点，预测的 3 个高频面试题"),
    weaknessQuestions: z
      .array(z.string())
      .length(2)
      .describe(
        "基于简历中未体现但 JD 明确要求的能力缺口，预测的 2 个压力测试题"
      ),
    tips: z
      .string()
      .describe("一句话的面试策略建议，帮助候选人在面试中扬长避短"),
  }),
});

export type TailorResult = z.infer<typeof tailorResultSchema>;

export const tailorRequestSchema = z.object({
  masterProfile: z.string().min(1, "履历数据不能为空"),
  targetJd: z.string().min(1, "JD 内容不能为空"),
});

export type TailorRequest = z.infer<typeof tailorRequestSchema>;
