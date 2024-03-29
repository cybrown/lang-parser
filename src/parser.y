%lex
%%

\s+                   /* skip whitespace */

/* Keywords */
"catch"               return 'CATCH'
"class"               return 'CLASS'
"finally"             return 'FINALLY'
"interface"           return 'INTERFACE'
"let"                 return 'LET'
"return"              return 'RETURN'
"throw"               return 'THROW'
"try"                 return 'TRY'
"var"                 return 'VAR'
"namespace"           return 'NAMESPACE'
"extends"             return 'EXTENDS'
"implements"          return 'IMPLEMENTS'
"true"                return 'LITERAL_BOOL'
"false"               return 'LITERAL_BOOL'

/* Values */
[0-9]+"."[0-9]*       return 'LITERAL_DOUBLE'
[0-9]+\b              return 'LITERAL_SIGNED_INTEGER'
"."[0-9]+?\b          return 'LITERAL_DOUBLE'
[a-zA-Z_]+[0-9a-zA-Z_]* return 'IDENTIFIER'

/* Operators */
'+='                  return 'ADD_ASSIGN'
'-='                  return 'SUB_ASSIGN'
'*='                  return 'MUL_ASSIGN'
'/='                  return 'DIV_ASSIGN'
'%='                  return 'REM_ASSIGN'
'<<='                 return 'SHL_ASSIGN'
'>>='                 return 'SHR_ASSIGN'
'&='                  return 'AND_ASSIGN'
'^='                  return 'XOR_ASSIGN'
'|='                  return 'OR_ASSIGN'
"=>"                  return 'ARROW'
"=="                  return 'EQ'
"!="                  return 'NE'
"<="                  return 'LE'
">="                  return 'GE'
"<<"                  return 'SHL'
">>"                  return 'SHR'
"&&"                  return 'AND'
"||"                  return 'OR'
"++"                  return 'INC'
"--"                  return 'DEC'
"*"                   return '*'
"!"                   return '!'
"~"                   return '~'
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
"?"                   return '?'
":"                   return ':'
"&"                   return '&'
"|"                   return '|'
"^"                   return '^'
"."                   return '.'

/* Special */
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%start Program

%%

Program
    : Statement EOF
        {return yy.node.Program([$1]);}
    | StatementList EOF
        {return yy.node.Program($1);}
    ;

/* Statements */

Statement
    : ExpressionStatement
        {$$ = $1;}
    | BlockStatement
        {$$ = $1;}
    | DeclarationStatement
        {$$ = $1;}
    | ReturnStatement
        {$$ = $1;}
    | ThrowStatement
        {$$ = $1;}
    | TryStatement
        {$$ = $1;}
    ;

DeclarationStatement
    : ClassDeclaration
        {$$ = $1;}
    | NamespaceDeclaration
        {$$ = $1;}
    | VariableDeclaration
        {$$ = $1;}
    | ConstantDeclaration
        {$$ = $1;}
    ;

TryStatement
    : TRY BlockStatement CatchClauseList
        {$$ = yy.node.TryStatement($2, $3, null);}
    | TRY BlockStatement CatchClauseList FINALLY BlockStatement
        {$$ = yy.node.TryStatement($2, $3, $5);}
    ;

CatchClauseList
    : CatchClause
        {$$ = [$1];}
    | CatchClauseList CatchClause
        {
            $1.push($2);
            $$ = $1;
        }
    ;

CatchClause
    : CATCH '(' IDENTIFIER ':' Type ')' BlockStatement
        {$$ = yy.node.CatchClause($3, $5, $7);}
    ;

ExpressionStatement
    : Expression ';'
        {$$ = yy.node.ExpressionStatement($1);}
    ;

ThrowStatement
    : THROW Expression ';'
        {$$ = yy.node.ThrowStatement($2);}
    ;

BlockStatement
    : '{' Statement '}'
        {$$ = yy.node.BlockStatement([$2]);}
    | '{' StatementList '}'
        {$$ = yy.node.BlockStatement($2);}
    | '{' '}'
        {$$ = yy.node.BlockStatement();}
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

ReturnStatement
    : RETURN ';'
        {$$ = yy.node.ReturnStatement(null);}
    | RETURN Expression ';'
        {$$ = yy.node.ReturnStatement($2);}
    ;

/* END Statements */

/* Declarations */

VariableDeclaration
    : VAR IDENTIFIER ':' Type ';'
        {$$ = yy.node.VariableDeclaration($2, $4);}
    | VAR IDENTIFIER ':' Type '=' Expression ';'
        {$$ = yy.node.VariableDeclaration($2, $4, $6);}
    | VAR IDENTIFIER '=' Expression ';'
        {$$ = yy.node.VariableDeclaration($2, null, $4);}
    ;

ConstantDeclaration
    : LET IDENTIFIER ':' Type ';'
        {$$ = yy.node.ConstantDeclaration($2, $4);}
    | LET IDENTIFIER ':' Type '=' Expression ';'
        {$$ = yy.node.ConstantDeclaration($2, $4, $6);}
    | LET IDENTIFIER '=' Expression ';'
        {$$ = yy.node.ConstantDeclaration($2, null, $4);}
    ;

NamespaceDeclaration
    : NAMESPACE NamespacePath '{' '}'
        {$$ = yy.node.NamespaceDeclaration($2, []);}
    | NAMESPACE NamespacePath '{' Statement '}'
        {$$ = yy.node.NamespaceDeclaration($2, [$4]);}
    | NAMESPACE NamespacePath '{' StatementList '}'
        {$$ = yy.node.NamespaceDeclaration($2, $4);}
    ;

ClassDeclaration
    : TypeKeyword IDENTIFIER '{' '}'
        {$$ = yy.node.ClassDeclaration($1, $2, []);}
    | TypeKeyword IDENTIFIER '{' ClassMemberList '}'
        {$$ = yy.node.ClassDeclaration($1, $2, $4);}
    | TypeKeyword IDENTIFIER TypeInheritance '{' '}'
        {$$ = yy.node.ClassDeclaration($1, $2, [], $3.extends, $3.implements);}
    | TypeKeyword IDENTIFIER TypeInheritance '{' ClassMemberList '}'
        {$$ = yy.node.ClassDeclaration($1, $2, $5);}
    ;

TypeKeyword
    : CLASS
        {$$ = 'class';}
    | INTERFACE
        {$$ = 'interface';}
    ;

TypeInheritance
    : EXTENDS Type
        {
            $$ = {
                extends: $2,
                implements: []
            };
        }
    | IMPLEMENTS TypeList
        {
            $$ = {
                extends: null,
                implements: $2
            };
        }
    | EXTENDS Type IMPLEMENTS TypeList
        {
            $$ = {
                extends: $2,
                implements: $4
            }
        }
    ;

NamespacePath
    : IDENTIFIER
        {$$ = [$1];}
    | NamespacePath '.' IDENTIFIER
        {
            $1.push($3);
            $$ = $1;
        }
    ;

/* END Declarations */

/* Subdeclarations */

ClassMemberList
    : ClassMember
        {$$ = [$1];}
    | ClassMemberList ClassMember
        {
            $1.push($2);
            $$ = $1;
        }
    ;

ClassMember
    : ClassAttribute
        {$$ = $1;}
    | ClassMethod
        {$$ = $1;}
    ;

ClassAttribute
    : IDENTIFIER ':' Type ';'
        {$$ = yy.node.MemberDeclaration('attribute', $1, $3);}
    ;

ClassMethod
    : IDENTIFIER '(' ')' BlockStatement
        {$$ = yy.node.MemberDeclaration('method', $1, null, [], $4);}
    | IDENTIFIER '(' MethodParameterList ')' BlockStatement
        {$$ = yy.node.MemberDeclaration('method', $1, null, $3, $5);}
    | IDENTIFIER '(' ')' ':' Type BlockStatement
        {$$ = yy.node.MemberDeclaration('method', $1, $5, [], $6);}
    | IDENTIFIER '(' MethodParameterList ')' ':' Type BlockStatement
        {$$ = yy.node.MemberDeclaration('method', $1, $6, $3, $7);}
    ;

MethodParameterList
    : MethodParameter
        {$$ = [$1];}
    | MethodParameterList ',' MethodParameter
        {
            $1.push($3);
            $$ = $1;
        }
    ;

MethodParameter
    : IDENTIFIER ':' Type
        {$$ = yy.node.MethodParameter($1, $3);}
    ;

Type
    : IDENTIFIER
        {$$ = yy.node.NamedType($1);}
    | Type '[' ']'
    | Type '<' TypeList '>'
    | '{' TypeList ARROW Type '}'
        {$$ = yy.node.FunctionType($4, $2);}
    | '(' TypeList ')'
    ;

TypeList
    : Type
        {$$ = [$1];}
    | TypeList ',' Type
        {
            $1.push($3);
            $$ = $1;
        }
    ;

/* END Subdeclarations */

/* Expressions */

Expression
    : AssignmentExpression
        {$$ = $1;}
    ;

AssignmentExpression
    : LambdaExpression
        {$$ = $1;}
    | LambdaExpression '=' AssignmentExpression
        {$$ = yy.node.AssignmentExpression($2, $1, $3);}
    | LambdaExpression ADD_ASSIGN AssignmentExpression
        {$$ = yy.node.AssignmentExpression($2, $1, $3);}
    | LambdaExpression SUB_ASSIGN AssignmentExpression
        {$$ = yy.node.AssignmentExpression($2, $1, $3);}
    | LambdaExpression MUL_ASSIGN AssignmentExpression
        {$$ = yy.node.AssignmentExpression($2, $1, $3);}
    | LambdaExpression DIV_ASSIGN AssignmentExpression
        {$$ = yy.node.AssignmentExpression($2, $1, $3);}
    | LambdaExpression REM_ASSIGN AssignmentExpression
        {$$ = yy.node.AssignmentExpression($2, $1, $3);}
    | LambdaExpression SHL_ASSIGN AssignmentExpression
        {$$ = yy.node.AssignmentExpression($2, $1, $3);}
    | LambdaExpression SHR_ASSIGN AssignmentExpression
        {$$ = yy.node.AssignmentExpression($2, $1, $3);}
    | LambdaExpression AND_ASSIGN AssignmentExpression
        {$$ = yy.node.AssignmentExpression($2, $1, $3);}
    | LambdaExpression XOR_ASSIGN AssignmentExpression
        {$$ = yy.node.AssignmentExpression($2, $1, $3);}
    | LambdaExpression OR_ASSIGN AssignmentExpression
        {$$ = yy.node.AssignmentExpression($2, $1, $3);}
    ;

LambdaExpression
    : ConditionalExpression
        {$$ = $1;}
    | '(' ')' ARROW ConditionalExpression
        {$$ = yy.node.LambdaExpression([], $4);}
    | ParanthesisExpression ARROW ConditionalExpression
        {
            if (!$1.$type || $1.$type !== 'Identifier') {
                throw new Error('Lambda arguments can only be identifiers');
            }
            $$ = yy.node.LambdaExpression([$1], $3);
        }
    | IDENTIFIER ARROW ConditionalExpression
        {$$ = yy.node.LambdaExpression([yy.node.Identifier($1)], $3);}
    | '(' LambdaParameterList ')' ARROW ConditionalExpression
        {$$ = yy.node.LambdaExpression($2, $5);}
    | '(' LambdaParameterList ')' ARROW BlockStatement
        {$$ = yy.node.LambdaExpression($2, $5);}
    ;

ConditionalExpression
    : LogicalOrExpression
        {$$ = $1;}
    | LogicalOrExpression '?' Expression ':' ConditionalExpression
        {$$ = yy.node.ConditionalExpression($1, $3, $5);}
    ;

LogicalOrExpression
    : LogicalAndExpression
        {$$ = $1;}
    | LogicalOrExpression OR LogicalAndExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    ;
LogicalAndExpression
    : BitwiseOrExpression
        {$$ = $1;}
    | LogicalAndExpression AND BitwiseOrExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    ;
BitwiseOrExpression
    : BitwiseXorExpression
        {$$ = $1;}
    | BitwiseOrExpression '|' BitwiseXorExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    ;

BitwiseXorExpression
    : BitwiseAndExpression
        {$$ = $1;}
    | BitwiseXorExpression '^' BitwiseAndExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    ;

BitwiseAndExpression
    : EqualityExpression
        {$$ = $1;}
    | BitwiseAndExpression '&' EqualityExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    ;

EqualityExpression
    : ComparisonExpression
        {$$ = $1;}
    | EqualityExpression EQ ComparisonExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    | EqualityExpression NE ComparisonExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    ;

ComparisonExpression
    : ShiftExpression
        {$$ = $1;}
    | ComparisonExpression '<' ShiftExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    | ComparisonExpression '>' ShiftExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    | ComparisonExpression LE ShiftExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    | ComparisonExpression GE ShiftExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    ;

ShiftExpression
    : AdditiveExpression
    | ShiftExpression SHL AdditiveExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    | ShiftExpression SHR AdditiveExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    ;

AdditiveExpression
    : MultiplicativeExpression
        {$$ = $1;}
    | AdditiveExpression '+' MultiplicativeExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    | AdditiveExpression '-' MultiplicativeExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    ;

MultiplicativeExpression
    : PrefixExpression
        {$$ = $1;}
    | MultiplicativeExpression '*' PrefixExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    | MultiplicativeExpression '/' PrefixExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    | MultiplicativeExpression '%' PrefixExpression
        {$$ = yy.node.BinaryExpression($2, $1, $3);}
    ;

PrefixExpression
    : PostfixExpression
        {$$ = $1;}
    | '-' PrefixExpression
        {$$ = yy.node.UnaryExpression($1, $2, true);}
    | '+' PrefixExpression
        {$$ = yy.node.UnaryExpression($1, $2, true);}
    | '!' PrefixExpression
        {$$ = yy.node.UnaryExpression($1, $2, true);}
    | '~' PrefixExpression
        {$$ = yy.node.UnaryExpression($1, $2, true);}
    | INC PrefixExpression
        {$$ = yy.node.UnaryExpression($1, $2, true);}
    | DEC PrefixExpression
        {$$ = yy.node.UnaryExpression($1, $2, true);}
    ;

PostfixExpression
    : MemberExpression
        {$$ = $1;}
    | PostfixExpression INC
        {$$ = yy.node.UnaryExpression($2, $1, false);}
    | PostfixExpression DEC
        {$$ = yy.node.UnaryExpression($2, $1, false);}
    | PostfixExpression '(' ')'
        {$$ = yy.node.CallExpression($1, []);}
    | PostfixExpression '(' CallArgumentList ')'
        {$$ = yy.node.CallExpression($1, $3);}
    ;

MemberExpression
    : PrimaryExpression
        {$$ = $1;}
    | MemberExpression '.' IDENTIFIER
        {$$ = yy.node.MemberExpression($1, $3);}
    | MemberExpression '[' Expression ']'
        {$$ = yy.node.SubscriptExpression($1, $3);}
    ;

PrimaryExpression
    : LITERAL_SIGNED_INTEGER
        {
            $$ = yy.node.Literal(
                yytext
            );
        }
    | LITERAL_DOUBLE
        {
            $$ = yy.node.Literal(
                yytext
            );
        }
    | LITERAL_BOOL
        {
            $$ = yy.node.Literal(
                yytext
            );
        }
    | IDENTIFIER
        {$$ = yy.node.Identifier(yytext);}
    | ParanthesisExpression
        {$$ = $1;}
    | ArrayExpression
        {$$ = $1;}
    ;

ArrayExpression
    : '[' ']'
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

/* END Expressions */

/* Subelements for Expressions */

LambdaParameterList
    : IDENTIFIER ',' IDENTIFIER
        {
            $$ = [
                yy.node.Identifier($1),
                yy.node.Identifier($3)
            ];
        }
    | LambdaParameterList ',' IDENTIFIER
        {
            $1.push(yy.node.Identifier($3));
            $$ = $1;
        }
    ;

CallArgumentList
    : Expression
        {$$ = [$1];}
    | CallArgumentList ',' Expression
        {
            $1.push($3);
            $$ = $1;
        }
    ;

/* END for Expressions */
