%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'LITERAL_NUMBER'
[a-zA-Z_]+[0-9a-zA-Z_]* return 'IDENTIFIER'
"=>"                  return 'ARROW'
"*"                   return '*'
"%"                   return '%'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"("                   return '('
")"                   return ')'
"{"                   return '{'
"}"                   return '}'
"["                   return '['
"]"                   return ']'
"<"                   return '<'
">"                   return '>'
","                   return ','
"="                   return '='
";"                   return ';'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%start Program

%%

Program
    : Statement EOF
        {return [$1];}
    | StatementList EOF
        {return $1;}
    ;

Statement
    : Expression ';'
        {$$ = $1;}
    | BlockStatement
        {$$ = $1;}
    ;

StatementList
    : Statement Statement
        {$$ = [$1, $2];}
    | StatementList Statement
        {
            $1.push($2);
            $$ = $1;
        }
    ;

BlockStatement
    : '{' Statement '}'
        {$$ = yy.node.BlockStatement([$2]);}
    | '{' StatementList '}'
        {$$ = yy.node.BlockStatement($2);}
    | '{' '}'
        {$$ = yy.node.BlockStatement();}
    ;

Expression
    : AffectionExpression
        {$$ = $1;}
    ;

AffectionExpression
    : LambdaExpression
        {$$ = $1;}
    | AffectionExpression '=' LambdaExpression
        {
            $$ = yy.node.CallExpression(
                yy.node.Identifier($2),
                [$1, $3]
            );
        }
    ;

LambdaExpression
    : ComparisonExpression
        {$$ = $1;}
    | '(' ')' ARROW ComparisonExpression
        {$$ = yy.node.LambdaExpression([], $4);}
    | ParanthesisExpression ARROW ComparisonExpression
        {
            if (!$1.type || $1.type !== 'Identifier') {
                throw new Error('Lambda arguments can only be identifiers');
            }
            $$ = yy.node.LambdaExpression([$1], $3);
        }
    | IDENTIFIER ARROW ComparisonExpression
        {$$ = yy.node.LambdaExpression([yy.node.Identifier($1)], $3);}
    | '(' IdentifierList ')' ARROW ComparisonExpression
        {$$ = yy.node.LambdaExpression($2, $5);}
    ;

ComparisonExpression
    : AdditiveExpression
        {$$ = $1;}
    | ComparisonExpression '<' AdditiveExpression
        {
            $$ = yy.node.CallExpression(
                yy.node.Identifier($2),
                [$1, $3]
            );
        }
    | ComparisonExpression '>' AdditiveExpression
        {
            $$ = yy.node.CallExpression(
                yy.node.Identifier($2),
                [$1, $3]
            );
        }
    ;

AdditiveExpression
    : MultiplicativeExpression
        {$$ = $1;}
    | AdditiveExpression '+' MultiplicativeExpression
        {
            $$ = yy.node.CallExpression(
                yy.node.Identifier($2),
                [$1, $3]
            );
        }
    | AdditiveExpression '-' MultiplicativeExpression
        {
            $$ = yy.node.CallExpression(
                yy.node.Identifier($2),
                [$1, $3]
            );
        }
    ;

MultiplicativeExpression
    : PrefixExpression
        {$$ = $1;}
    | MultiplicativeExpression '*' PrefixExpression
        {
            $$ = yy.node.CallExpression(
                yy.node.Identifier($2),
                [$1, $3]
            );
        }
    | MultiplicativeExpression '/' PrefixExpression
        {
            $$ = yy.node.CallExpression(
                yy.node.Identifier($2),
                [$1, $3]
            );
        }
    | MultiplicativeExpression '%' PrefixExpression
        {
            $$ = yy.node.CallExpression(
                yy.node.Identifier($2),
                [$1, $3]
            );
        }
    ;

PrefixExpression
    : PostfixExpression
        {$$ = $1;}
    | '-' PrefixExpression
        {
            $$ = yy.node.CallExpression(
                yy.node.Identifier($1),
                [$1]
            );
        }
    ;

PostfixExpression
    : PrimaryExpression
        {$$ = $1;}
    | PostfixExpression '(' ')'
        {$$ = yy.node.CallExpression($1, []);}
    | PostfixExpression '(' ArgumentList ')'
        {$$ = yy.node.CallExpression($1, $3);}
    ;

PrimaryExpression
    : LITERAL_NUMBER
        {$$ = yy.node.Literal(yytext);}
    | IDENTIFIER
        {$$ = yy.node.Identifier(yytext);}
    | ParanthesisExpression
        {$$ = $1;}
    | '[' ']'
        {$$ = yy.node.BracketExpression([]);}
    | '[' Expression ']'
        {$$ = yy.node.BracketExpression($2);}
    | '[' ExpressionList ']'
        {$$ = yy.node.BracketExpression($2);}
    ;

ParanthesisExpression
    : '(' Expression ')'
        {$$ = $2;}
    ;

ExpressionList
    : Expression ',' Expression
        {$$ = [$1, $3];}
    | ExpressionList ',' Expression
        {
            $1.push($3);
            $$ = $1;
        }
    ;

ArgumentList
    : Expression
        {$$ = [$1];}
    | ArgumentList ',' Expression
        {
            $1.push($3);
            $$ = $1;
        }
    ;

IdentifierList
    : IDENTIFIER ',' IDENTIFIER
        {
            $$ = [
                yy.node.Identifier($1),
                yy.node.Identifier($3)
            ];
        }
    | IdentifierList ',' IDENTIFIER
        {
            $1.push(yy.node.Identifier($3));
            $$ = $1;
        }
    ;
