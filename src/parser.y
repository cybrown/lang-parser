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
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%left '='
%left ','
%left ARROW
%left '<' '>'
%left '+' '-'
%left '*' '/' '%'
%left UMINUS

%start Root

%%

Root
    : Expression EOF
        {return $1;}
    ;

Expression
    : Expression ',' Expression
        {
            if (!Array.isArray($1)) {
                $1 = [$1];
            }
            $1.push($3);
            $$ = $1;
        }
    | Expression '=' Expression
        {
            $$ = yy.node.CallExpression(
                yy.node.Identifier($2),
                [$1, $3]
            );
        }
    | Expression '+' Expression
        {
            $$ = yy.node.CallExpression(
                yy.node.Identifier($2),
                [$1, $3]
            );
        }
    | Expression '<' Expression
        {
            $$ = yy.node.CallExpression(
                yy.node.Identifier($2),
                [$1, $3]
            );
        }
    | Expression '>' Expression
        {
            $$ = yy.node.CallExpression(
                yy.node.Identifier($2),
                [$1, $3]
            );
        }
    | Expression '-' Expression
        {
            $$ = yy.node.CallExpression(
                yy.node.Identifier($2),
                [$1, $3]
            );
        }
    | Expression '%' Expression
        {
            $$ = yy.node.CallExpression(
                yy.node.Identifier($2),
                [$1, $3]
            );
        }
    | Expression '*' Expression
        {
            $$ = yy.node.CallExpression(
                yy.node.Identifier($2),
                [$1, $3]
            );
        }
    | Expression '/' Expression
        {
            $$ = yy.node.CallExpression(
                yy.node.Identifier($2),
                [$1, $3]
            );
        }
    | '-' Expression %prec UMINUS
        {
            $$ = yy.node.CallExpression(
                yy.node.Identifier($1),
                [$2]
            );
        }
    | LambdaExpression
        {$$ = $1;}
    | ParenthesisExpression
        {$$ = $1;}
    | BlockExpression
        {$$ = $1;}
    | BracketExpression
        {$$ = $1;}
    | LITERAL_NUMBER
        {$$ = yy.node.Literal(yytext);}
    | IDENTIFIER
        {$$ = yy.node.Identifier(yytext);}
    ;

BlockExpression
    : '{' Expression '}'
        {$$ = yy.node.BlockExpression($2);}
    | '{' '}'
        {$$ = yy.node.BlockExpression();}
    ;

BracketExpression
    : '[' Expression ']'
        {$$ = yy.node.BracketExpression($2);}
    | '[' ']'
        {$$ = yy.node.BracketExpression();}
    ;

ParenthesisExpression
    : '(' Expression ')'
        {$$ = $2;}
    | '(' ')'
        {$$ = [];}
    ;

LambdaExpression
    : Expression ARROW Expression
        {
            $$ = yy.node.LambdaExpression(
                !Array.isArray($1) ? [$1] : $1,
                $3
            );
        }
    ;
