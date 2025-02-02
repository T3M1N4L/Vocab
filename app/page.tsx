"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useState } from "react"

const chaptersData = {
  chapters: {
    "Chapter 4": {
      "Part 1": {
        Quizlet: { name: "Quizlet 4.1 - EJ", url: "https://quizlet.com/817063771/" },
        Blooket: { name: "Blooket 4.1 - EJ", url: "https://dashboard.blooket.com/set/64ebee4498ebc0f6aa193d63" },
      },
      "Part 2": {
        Quizlet: { name: "Quizlet 4.2 - Siddharth", url: "https://quizlet.com/823889103/" },
        Blooket: { name: "Blooket 4.2 - EJ", url: "https://dashboard.blooket.com/set/65161c25c0f2f908ec5e4f2d" },
      },
      "Part 3": {
        Quizlet: { name: "Quizlet 4.3 - Siva", url: "https://quizlet.com/835393446/" },
        Blooket: { name: "Blooket 4.3 - Aarush", url: "https://dashboard.blooket.com/set/65328379efd20319b44ac24b" },
      },
      "Part 4": {
        Quizlet: { name: "Quizlet 4.4 - EJ", url: "https://quizlet.com/857501540/" },
        Blooket: { name: "Blooket 4.4 - EJ", url: "https://dashboard.blooket.com/set/6567ffd43851d7fe89486c6d" },
        Gimkit: { name: "Gimkit 4.4 - Siva", url: "https://www.gimkit.com/view/6544f80af6e243002b51da20" },
      },
    },
    "Chapter 5": {
      "Part 1": {
        Quizlet: { name: "Quizlet 5.1 - Siva", url: "https://quizlet.com/858837221/" },
        Blooket: { name: "Blooket 5.1 - EJ", url: "https://dashboard.blooket.com/set/65c013d858bd111e995cc869" },
      },
      "Part 2": {
        Quizlet: { name: "Quizlet 5.2 - Siva", url: "https://quizlet.com/872830513/" },
        Blooket: { name: "Blooket 5.2 - EJ", url: "https://dashboard.blooket.com/set/65c014e6dfc81c41fc02748d" },
        Gimkit: { name: "Gimkit 5.2 - Aarush", url: "https://www.gimkit.com/view/65c3bcf5ea1eb6002c1b8c47" },
        Knowt: {
          name: "Knowt 5.2 (just words)- Siddharth (EJ fixed)",
          url: "https://knowt.com/flashcards/fb88420d-458c-44b9-9ae6-57100844c299",
        },
      },
    },
    "Chapter 6": {
      "Part 1": {
        Quizlet: { name: "Quizlet 6.1 - Siva", url: "https://quizlet.com/883416910/" },
        Gimkit: { name: "Gimkit 6.1 - Siva", url: "https://www.gimkit.com/view/65cf74ad5d375d002ced03b8" },
        Knowt: {
          name: "Knowt 6.1 (just words)- Siddharth",
          url: "https://knowt.com/flashcards/7acd39d6-2cfe-4b81-8589-bb6641b4cbf1?isNew=true",
        },
        Blooket: { name: "Blooket 6.1 - Aarush", url: "https://dashboard.blooket.com/set/65e69cd1242f91a6a2dd0197" },
        KnowtPrefixes: {
          name: "Knowt all prefixes until 6.1 (just prefixes)- EJ",
          url: "https://knowt.com/flashcards/3c774f78-973b-407d-ab74-674db11433c2",
        },
      },
      "Part 2": {
        Quizlet: { name: "Quizlet 6.2 - Evan", url: "https://quizlet.com/891770680/" },
        Knowt: {
          name: "Knowt 6.2 (just words) - EJ",
          url: "https://knowt.com/flashcards/01e439d0-668e-4061-9d32-b50ee4added8",
        },
        Blooket: { name: "Blooket 6.2 - Evan", url: "https://dashboard.blooket.com/set/65eb746f0b61c63014531b52" },
        KnowtPrefixes: {
          name: "Knowt all prefixes until 6.2 (just prefixes)- EJ",
          url: "https://knowt.com/flashcards/3f53367e-8634-4f14-9923-45c13c30c651",
        },
      },
    },
  },
}

const prefixesData = [
  { prefix: "a, ab, abs", meaning: "From, away, off" },
  { prefix: "Ad", meaning: "To, toward, near" },
  { prefix: "Ante", meaning: "Before" },
  { prefix: "Post", meaning: "after" },
  { prefix: "Bi", meaning: "two" },
  { prefix: "semi", meaning: "half, partly" },
  { prefix: "E, Ex", meaning: "out, from, away" },
  { prefix: "In, Im", meaning: "in, into, on, against, over" },
  { prefix: "Extra", meaning: "outside" },
  { prefix: "Intra", meaning: "Within" },
  { prefix: "contra, counter, contro", meaning: "against, contrary" },
  { prefix: "Inter", meaning: "between" },
  { prefix: "In, Il, Im, Ir", meaning: "not, un" },
  { prefix: "Bene", meaning: "well, good" },
  { prefix: "mal, male", meaning: "evil, ill, bad, badly" },
  { prefix: "De", meaning: "down, down from, opposite of" },
  { prefix: "Dis", meaning: "opposite of, differently, apart, away" },
  { prefix: "Se", meaning: "Apart" },
  { prefix: "Circum", meaning: "around, round" },
  { prefix: "Con, Co, Col, Cor", meaning: "together, with" },
  { prefix: "Ob", meaning: "against, in the way, over" },
  { prefix: "Per", meaning: "through, to the end, thoroughly" },
  { prefix: "Pre", meaning: "before, beforehand, fore-" },
  { prefix: "Pro", meaning: "forward, forth" },
  { prefix: "Am, Amor", meaning: "love, liking, friendliness" },
  { prefix: "Anim", meaning: "mind, will, spirit" },
  { prefix: "Fin", meaning: "end, boundary, limit" },
  { prefix: "Flu, Fluc, Flux", meaning: "flow" },
  { prefix: "Gen, Gener, Genit", meaning: "birth, kind, class" },
  { prefix: "Greg", meaning: "gather, flock" },
  { prefix: "Here, hes", meaning: "stick" },
  { prefix: "Lateral", meaning: "side" },
  { prefix: "Litera", meaning: "letter" },
  { prefix: "Luc, Lum", meaning: "light" },
  { prefix: "Man, Manu", meaning: "hand" },
  { prefix: "Pend, Pens", meaning: "hang" },
  { prefix: "Pon, Pos", meaning: "put" },
  { prefix: "Scribe, Script", meaning: "write" },
  { prefix: "Simil, Simul", meaning: "similar, like, same" },
  { prefix: "Sol, Soli", meaning: "alone, lonley, single" },
  { prefix: "Solv, solu, solut", meaning: "loosen" },
  { prefix: "Und, unda", meaning: "wave, flow" },
  { prefix: "Ver, Vera, Veri", meaning: "true, truth" },
  { prefix: "Vid, Vis", meaning: "see, look, sight" },
  { prefix: "Aut, Auto", meaning: "self" },
  { prefix: "Cracy", meaning: "government" },
  { prefix: "Dem, Demo", meaning: "people" },
  { prefix: "Pan, Panto", meaning: "all, complete" },
  { prefix: "Chron, Chrono", meaning: "time" },
  { prefix: "Mania", meaning: "madness, insane impulse, craze" },
  { prefix: "Ped", meaning: "child" },
  { prefix: "Ortho", meaning: "straight, correct" },
  { prefix: "Gen, Geno, Genea", meaning: "race, kind, birth" },
  { prefix: "Meter, Metr", meaning: "measure" },
  { prefix: "Ant, Anti", meaning: "agaisnt, opposite" },
  { prefix: "Onym, Onomato", meaning: "name, word" },
  { prefix: "Nom, Nem", meaning: "management, distribution, law" },
  { prefix: "Phan, Phen", meaning: "show, appear" },
  { prefix: "Thermo, Therm", meaning: "heat" },
  { prefix: "Prot, Proto", meaning: "first" },
  { prefix: "Thesis, Thet", meaning: "set, place, put" },
  { prefix: "Aster, Astro, Astr", meaning: "star" },
  { prefix: "Gram, Graph", meaning: "letter, writing" },
  { prefix: "Derm, Dermato", meaning: "skin" },
]

const similarPrefixes = [
  { meaning: "away", prefixes: ["A,Ab,Abs", "E, Ex", "Dis"] },
  { meaning: "before", prefixes: ["Pre", "Ante"] },
  { meaning: "from", prefixes: ["A,Ab,Abs", "E, Ex"] },
  { meaning: "against", prefixes: ["Ob", "Contra, Counter, Contro", "In, Im", "Ant, Anti"] },
  { meaning: "over", prefixes: ["In, Im", "Ob"] },
  { meaning: "opposite of", prefixes: ["De", "Dis"] },
  { meaning: "apart", prefixes: ["Dis", "Se"] },
  { meaning: "flow", prefixes: ["Und, Unda", "Flu, Fluc, Flux"] },
  { meaning: "kind", prefixes: ["Gen, Geno, Genea", "Gen, Gener, Genit"] },
  { meaning: "birth", prefixes: ["Gen, Geno, Genea", "Gen, Gener, Genit"] },
  { meaning: "put", prefixes: ["Pon, Pos", "Thesis, Thet"] },
  { meaning: "letter", prefixes: ["Gram, Graph", "Litera"] },
]

const platformColors = {
  Quizlet: "text-blue-500",
  Blooket: "text-cyan-500",
  Gimkit: "text-purple-500",
  Knowt: "text-emerald-500",
  KnowtPrefixes: "text-emerald-500",
}

export default function Page() {
  const [activeTab, setActiveTab] = useState("chapters")

  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <header className="mb-12">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-4"
          >
            Vocab Study Dump
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground"
          >
            Made from Vocabulary For The Highschool Student
          </motion.p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList>
            <TabsTrigger value="chapters">By Chapter</TabsTrigger>
            <TabsTrigger value="prefixes">Prefixes</TabsTrigger>
            <TabsTrigger value="similar">Similar Prefixes</TabsTrigger>
            <TabsTrigger value="all">All Prefixes</TabsTrigger>
            <TabsTrigger value="contributors">Contributors</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <TabsContent value="chapters">
                <div className="grid gap-6">
                  {Object.entries(chaptersData.chapters).map(([chapter, parts]) => (
                    <Card key={chapter}>
                      <CardHeader>
                        <CardTitle>{chapter}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          {Object.entries(parts).map(([part, resources]) => (
                            <div key={part} className="space-y-4">
                              <h3 className="font-semibold text-lg">{part}</h3>
                              <div className="grid gap-2">
                                {Object.entries(resources).map(([platform, resource]) => (
                                  <Link
                                    key={resource.name}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Button variant="ghost" className="w-full justify-between group hover:bg-accent">
                                      <span className={cn("font-medium", platformColors[platform])}>
                                        {resource.name}
                                      </span>
                                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="prefixes">
  <Card>
    <CardHeader>
      <CardTitle>Study The Prefixes</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-4">
        {prefixesData.map((prefix, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start space-x-2"
          >
            <code className="bg-muted px-1 py-0.5 rounded">{prefix.prefix}</code>
            <span>-</span>
            <span>{prefix.meaning}</span>
          </motion.li>
        ))}
      </ul>
    </CardContent>
  </Card>
</TabsContent>


<TabsContent value="similar">
  <Card>
    <CardHeader>
      <CardTitle>Similar Prefixes</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-4">
        {similarPrefixes.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-2"
          >
            <code className="bg-muted px-1 py-0.5 rounded">{item.meaning}</code>
            <span>-</span>
            <span>{item.prefixes.join(", ")}</span>
          </motion.li>
        ))}
      </ul>
    </CardContent>
  </Card>
</TabsContent>



              <TabsContent value="all">
                <Card>
                  <CardHeader>
                    <CardTitle>All Prefixes Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <Link href="https://quizlet.com/911769728/" target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" className="w-full justify-between group">
                        <span className="text-blue-500 font-medium">All Prefixes (Quizlet)</span>
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    <Link
                      href="https://knowt.com/flashcards/3f53367e-8634-4f14-9923-45c13c30c651"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" className="w-full justify-between group">
                        <span className="text-emerald-500 font-medium">All Prefixes (Knowt)</span>
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    <Link
                      href="https://dashboard.blooket.com/set/663452febb214ff79a16630d"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" className="w-full justify-between group">
                        <span className="text-cyan-500 font-medium">All Prefixes (Blooket)</span>
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contributors">
                <Card>
                  <CardHeader>
                    <CardTitle>Main Contributors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {["Sivasurya Elango", "Aarush Bagchi", "Siddharthkrishna Kodathala", "EJ"].map((name, index) => (
                        <motion.div
                          key={name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className="p-4 rounded-lg bg-accent text-accent-foreground"
                        >
                          {name}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </div>
  )
}

