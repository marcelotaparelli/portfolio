# DefectRisk — post para LinkedIn

Nem todo problema de IA precisa de um LLM.

Depois de projetos com RAG, agentes e LLMs, quis explorar outra frente da Engenharia de IA: Machine Learning aplicado a uma decisão real.

A pergunta era simples:
se uma equipe não consegue revisar todo o código, onde vale a pena olhar primeiro?

Foi daí que nasceu o DefectRisk.

O modelo analisa métricas de software e organiza os módulos por risco, ajudando a priorizar a revisão humana.

No teste histórico com 2.177 módulos, os aproximadamente 30% priorizados concentraram 300 dos 421 módulos com defeitos conhecidos.

Ou seja:
~30% dos módulos priorizados para revisão → 71,26% dos módulos com defeitos conhecidos nessa fila.

Isso não significa que o modelo “encontra bugs sozinho”.

O objetivo é outro: ajudar uma equipe a decidir onde começar a investigar.

E uma das partes mais importantes do projeto foi perceber que construir o modelo era só uma parte do trabalho. Também precisei garantir que a avaliação fosse confiável, entender os limites dos dados e reconhecer quando aumentar a complexidade já não estava trazendo ganhos relevantes.

Também transformei o modelo em algo executável: ele pode receber métricas de novos módulos e gerar um ranking de risco via CLI.

Esse projeto reforçou uma ideia que quero levar para meu trabalho como engenheiro:

um bom sistema de IA não é só aquele que tem uma boa métrica. É aquele que ajuda a tomar uma decisão real e cujos limites conseguimos explicar.

Case completo:
https://marcelotaparelli.com.br/projetos/defectrisk-ml/

Código:
https://github.com/marcelotaparelli/defectrisk-ml

#AIEngineering #MachineLearning #SoftwareEngineering
